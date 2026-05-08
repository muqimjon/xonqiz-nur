import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Lang } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <!-- Logo -->
        <a href="#home" class="nav-logo">
          <div class="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <!-- Bolt + Drop combined mark -->
              <rect width="36" height="36" rx="10" fill="currentColor" class="logo-bg"/>
              <!-- Lightning bolt -->
              <path d="M20 5L10 20H18L16 31L26 16H18L20 5Z" fill="#f5a623"/>
              <!-- Water drop hint -->
              <circle cx="11" cy="27" r="2.5" fill="#4fc3f7" opacity="0.8"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-main">XONQIZ</span>
            <span class="logo-sub">NUR</span>
          </div>
        </a>

        <!-- Desktop Nav Links -->
        <ul class="nav-links">
          <li><a href="#home" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.home }}</a></li>
          <li><a href="#products" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.products }}</a></li>
          <li><a href="#about" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.about }}</a></li>
          <li><a href="#location" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.location }}</a></li>
          <li><a href="#contact" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.contact }}</a></li>
        </ul>

        <!-- Controls -->
        <div class="nav-controls">
          <!-- Language switcher -->
          <div class="lang-switcher">
            @for (l of langs; track l) {
              <button class="lang-btn" [class.active]="ts.lang() === l" (click)="ts.setLang(l)">
                {{ l.toUpperCase() }}
              </button>
            }
          </div>

          <!-- Theme toggle -->
          <button class="theme-btn" (click)="theme.toggle()" [title]="theme.isDark() ? 'Light mode' : 'Dark mode'">
            @if (theme.isDark()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            }
          </button>

          <!-- Hamburger -->
          <button class="hamburger" (click)="menuOpen.set(!menuOpen())" [class.open]="menuOpen()">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="mobile-menu">
          <ul>
            <li><a href="#home" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.home }}</a></li>
            <li><a href="#products" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.products }}</a></li>
            <li><a href="#about" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.about }}</a></li>
            <li><a href="#location" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.location }}</a></li>
            <li><a href="#contact" class="nav-link" (click)="closeMenu()">{{ ts.t.nav.contact }}</a></li>
          </ul>
        </div>
      }
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 16px 0;
      transition: all 0.4s ease;
    }
    .navbar.scrolled {
      background: var(--color-glass);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border-bottom: 1px solid var(--color-glass-border);
      padding: 10px 0;
      box-shadow: 0 4px 32px rgba(0,0,0,0.2);
    }
    .nav-inner {
      max-width: 1200px; margin: 0 auto;
      padding: 0 24px;
      display: flex; align-items: center; justify-content: space-between; gap: 24px;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px; text-decoration: none;
      transition: transform 0.3s ease;
    }
    .nav-logo:hover { transform: scale(1.03); }
    .logo-icon { flex-shrink: 0; }
    .logo-bg { fill: rgba(245,166,35,0.12); }
    .logo-text { display: flex; flex-direction: column; line-height: 1; }
    .logo-main { font-size: 1rem; font-weight: 900; color: var(--color-text); letter-spacing: 0.06em; }
    .logo-sub { font-size: 0.65rem; font-weight: 700; color: var(--color-accent); letter-spacing: 0.15em; }

    .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; }
    .nav-link {
      display: block; padding: 8px 14px; border-radius: 10px;
      text-decoration: none; color: var(--color-text-muted);
      font-size: 0.88rem; font-weight: 500; transition: all 0.25s ease;
    }
    .nav-link:hover { color: var(--color-text); background: var(--color-surface); }

    .nav-controls { display: flex; align-items: center; gap: 8px; }

    .lang-switcher { display: flex; gap: 2px; background: var(--color-surface); border-radius: 10px; padding: 3px; }
    .lang-btn {
      padding: 5px 10px; border-radius: 7px; border: none;
      background: transparent; color: var(--color-text-muted);
      font-size: 0.72rem; font-weight: 700; cursor: pointer;
      transition: all 0.2s ease; font-family: 'Onest', sans-serif; letter-spacing: 0.04em;
    }
    .lang-btn.active { background: var(--color-accent); color: #000; }
    .lang-btn:hover:not(.active) { background: var(--color-surface-hover); color: var(--color-text); }

    .theme-btn {
      width: 38px; height: 38px; border-radius: 10px; border: 1px solid var(--color-border);
      background: var(--color-surface); color: var(--color-text-muted);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.25s ease;
    }
    .theme-btn:hover { color: var(--color-accent); border-color: var(--color-accent); background: var(--color-glow); }

    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      width: 38px; height: 38px; border-radius: 10px;
      border: 1px solid var(--color-border); background: var(--color-surface);
      align-items: center; justify-content: center; cursor: pointer; padding: 8px;
    }
    .hamburger span {
      display: block; width: 18px; height: 2px;
      background: var(--color-text-muted); border-radius: 2px;
      transition: all 0.3s ease; transform-origin: center;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      position: absolute; top: 100%; left: 0; right: 0;
      background: var(--color-glass); backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--color-glass-border);
      padding: 12px 24px 20px; animation: slide-down 0.3s ease;
    }
    @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 2px; }
    .mobile-menu .nav-link { font-size: 1rem; padding: 12px 16px; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
    }
    @media (max-width: 480px) {
      .lang-switcher .lang-btn { padding: 5px 7px; font-size: 0.68rem; }
    }
  `]
})
export class NavbarComponent {
  ts = inject(TranslationService);
  theme = inject(ThemeService);
  scrolled = signal(false);
  menuOpen = signal(false);
  langs: Lang[] = ['uz', 'ru', 'en'];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  closeMenu() { this.menuOpen.set(false); }
}
