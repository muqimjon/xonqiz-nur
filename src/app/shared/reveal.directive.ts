import { Directive, ElementRef, inject, afterNextRender, input } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  revealDelay = input(0);

  constructor() {
    const host = this.el.nativeElement;
    host.classList.add('fade-up');
    afterNextRender(() => {
      const d = this.revealDelay();
      if (d) host.style.transitionDelay = `${d * 0.08}s`;
      const io = new IntersectionObserver(
        (entries, obs) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              host.classList.add('visible');
              obs.unobserve(host);
            }
          }),
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      io.observe(host);
    });
  }
}
