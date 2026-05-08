import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isDark = signal(true);
  isDark = this._isDark.asReadonly();

  init() {
    const saved = localStorage.getItem('xn-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    this._isDark.set(dark);
    this.apply(dark);
  }

  toggle() {
    const newVal = !this._isDark();
    this._isDark.set(newVal);
    this.apply(newVal);
    localStorage.setItem('xn-theme', newVal ? 'dark' : 'light');
  }

  private apply(dark: boolean) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
