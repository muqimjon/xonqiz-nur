import { Directive, ElementRef, inject, afterNextRender, input } from '@angular/core';
import { MotionService } from './motion.service';

@Directive({ selector: '[appTilt]', standalone: true })
export class TiltDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private motion = inject(MotionService);
  tiltMax = input(8);

  constructor() {
    afterNextRender(() => {
      if (this.motion.lowPower() || !this.motion.animate) return;
      const host = this.el.nativeElement;
      let raf = 0;
      let rx = 0;
      let ry = 0;

      const apply = () => {
        raf = 0;
        host.style.setProperty('--tilt-x', `${rx}deg`);
        host.style.setProperty('--tilt-y', `${ry}deg`);
        host.style.transform = 'perspective(900px) rotateX(var(--tilt-x,0)) rotateY(var(--tilt-y,0))';
      };

      host.addEventListener('pointermove', (e) => {
        const r = host.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        rx = -(ny - 0.5) * 2 * this.tiltMax();
        ry = (nx - 0.5) * 2 * this.tiltMax();
        host.style.setProperty('--mx', `${nx * 100}%`);
        host.style.setProperty('--my', `${ny * 100}%`);
        if (!raf) raf = requestAnimationFrame(apply);
      });

      host.addEventListener('pointerenter', () => (host.style.willChange = 'transform'));
      host.addEventListener('pointerleave', () => {
        rx = ry = 0;
        host.style.setProperty('--tilt-x', '0deg');
        host.style.setProperty('--tilt-y', '0deg');
        host.style.willChange = 'auto';
      });
    });
  }
}
