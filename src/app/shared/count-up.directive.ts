import { Directive, ElementRef, inject, afterNextRender, input } from '@angular/core';
import { MotionService } from './motion.service';

@Directive({ selector: '[appCountUp]', standalone: true })
export class CountUpDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private motion = inject(MotionService);
  countTo = input.required<number>();
  countSuffix = input('');
  countDuration = input(1500);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      const target = this.countTo();
      const render = (v: number) => (host.textContent = `${Math.round(v)}${this.countSuffix()}`);
      if (!this.motion.animate) {
        render(target);
        return;
      }
      render(0);
      const io = new IntersectionObserver(
        (entries, obs) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              obs.disconnect();
              this.run(target, render);
            }
          }),
        { threshold: 0.4 },
      );
      io.observe(host);
    });
  }

  private run(target: number, render: (v: number) => void) {
    const dur = this.countDuration();
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      render(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
