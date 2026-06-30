import { Injectable, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MotionService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly reduced = signal(false);
  readonly lowPower = signal(false);

  constructor() {
    afterNextRender(() => {
      const mq = matchMedia('(prefers-reduced-motion: reduce)');
      this.reduced.set(mq.matches);
      mq.addEventListener('change', (e) => this.reduced.set(e.matches));

      const nav = navigator as Navigator & { deviceMemory?: number };
      const cores = nav.hardwareConcurrency ?? 8;
      const mem = nav.deviceMemory ?? 8;
      const coarse = matchMedia('(pointer: coarse)').matches;
      this.lowPower.set(cores <= 4 || mem <= 4 || coarse);

      if (this.canRefract()) document.documentElement.classList.add('refract');
    });
  }

  get animate(): boolean {
    return this.isBrowser && !this.reduced();
  }

  get heavy(): boolean {
    return this.animate && !this.lowPower();
  }

  private canRefract(): boolean {
    const uad = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData;
    const chromium = uad?.brands?.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand)) ?? false;
    return chromium && CSS.supports('backdrop-filter', 'url(#x)');
  }
}
