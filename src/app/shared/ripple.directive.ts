import { Directive, ElementRef, inject, afterNextRender } from '@angular/core';
import { MotionService } from './motion.service';

@Directive({ selector: '[appRipple]', standalone: true })
export class RippleDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private motion = inject(MotionService);

  constructor() {
    afterNextRender(() => {
      const host = this.el.nativeElement;
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      host.style.overflow = 'hidden';
      host.addEventListener(
        'pointerdown',
        (e) => {
          if (!this.motion.animate) return;
          const rect = host.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const span = document.createElement('span');
          span.className = 'ripple';
          span.style.width = span.style.height = `${size}px`;
          span.style.left = `${e.clientX - rect.left - size / 2}px`;
          span.style.top = `${e.clientY - rect.top - size / 2}px`;
          host.appendChild(span);
          span
            .animate(
              [
                { transform: 'scale(0)', opacity: 0.5 },
                { transform: 'scale(2.2)', opacity: 0 },
              ],
              { duration: 600, easing: 'cubic-bezier(0.4,0,0.2,1)' },
            )
            .finished.finally(() => span.remove());
        },
        { passive: true },
      );
    });
  }
}
