import { Directive, ElementRef, inject, afterNextRender, input } from '@angular/core';
import { MotionService } from './motion.service';

@Directive({ selector: '[appMagnetic]', standalone: true })
export class MagneticDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private motion = inject(MotionService);
  magnetStrength = input(0.35);
  magnetMax = input(10);

  constructor() {
    afterNextRender(() => {
      if (this.motion.lowPower() || !this.motion.animate) return;
      const host = this.el.nativeElement;
      host.style.transition = 'transform var(--dur) var(--ease-spring)';
      let raf = 0;
      let x = 0;
      let y = 0;
      const apply = () => {
        raf = 0;
        host.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      host.addEventListener('pointermove', (e) => {
        const r = host.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-this.magnetMax(), Math.min(this.magnetMax(), v));
        x = clamp((e.clientX - (r.left + r.width / 2)) * this.magnetStrength());
        y = clamp((e.clientY - (r.top + r.height / 2)) * this.magnetStrength());
        if (!raf) raf = requestAnimationFrame(apply);
      });
      host.addEventListener('pointerleave', () => {
        x = y = 0;
        host.style.transform = 'translate3d(0,0,0)';
      });
    });
  }
}
