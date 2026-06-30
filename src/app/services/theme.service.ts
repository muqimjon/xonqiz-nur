import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private _isDark = signal(true);
  isDark = this._isDark.asReadonly();

  init() {
    if (!this.isBrowser) return;
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr) {
      this._isDark.set(attr === 'dark');
      return;
    }
    const saved = localStorage.getItem('xn-theme');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._isDark.set(dark);
    this.apply(dark);
  }

  toggle() {
    if (!this.isBrowser) return;
    const next = !this._isDark();
    const run = () => {
      this._isDark.set(next);
      this.apply(next);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(run);
    } else {
      run();
    }
    localStorage.setItem('xn-theme', next ? 'dark' : 'light');
  }

  private apply(dark: boolean) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
