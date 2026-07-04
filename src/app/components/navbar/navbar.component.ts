import { Component, ChangeDetectionStrategy, inject, signal, afterNextRender } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TranslationService, Lang } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { LogoComponent } from '../../shared/logo.component';
import { WorldIconComponent } from '../../shared/world-icon.component';
import { WORLDS } from '../../shared/catalog.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LogoComponent, WorldIconComponent],
  template: `
    <header class="nav" [class.scrolled]="scrolled()">
      <div class="nav-inner liquid-glass lg-nav lg-refract">
        <a class="brand" [routerLink]="path()" (click)="close()">
          <app-logo [size]="38" />
          <span class="brand-text">
            <span class="brand-main">XONQIZ</span>
            <span class="brand-sub">NUR</span>
          </span>
        </a>

        <nav class="links" aria-label="Asosiy menyu">
          <a [routerLink]="path()" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            {{ t().nav.home }}
          </a>
          <div class="has-panel">
            <a [routerLink]="path('katalog')" routerLinkActive="active">{{ t().nav.catalog }}</a>
            <div class="panel liquid-glass">
              @for (w of worlds; track w.id) {
                <a class="panel-item" [routerLink]="path('katalog', w.slug)" [attr.data-accent]="w.accent">
                  <span class="pi-icon"><app-world-icon [world]="w.id" [size]="22" /></span>
                  <span>
                    <span class="pi-name">{{ t().catalog.worlds[w.id].name }}</span>
                    <span class="pi-blurb">{{ t().catalog.worlds[w.id].blurb }}</span>
                  </span>
                </a>
              }
            </div>
          </div>
          <a [routerLink]="path('biz-haqimizda')" routerLinkActive="active">{{ t().nav.about }}</a>
          <a [routerLink]="path('aloqa')" routerLinkActive="active">{{ t().nav.contact }}</a>
        </nav>

        <div class="controls">
          <div class="langs">
            @for (l of langList; track l) {
              <button [class.on]="lang() === l" (click)="switchLang(l)" [attr.aria-label]="'Til: ' + l">{{ l }}</button>
            }
          </div>
          <button class="icon-btn" (click)="theme.toggle()" aria-label="Mavzu">
            @if (theme.isDark()) {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            } @else {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
              </svg>
            }
          </button>
          <button class="icon-btn burger" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-label="Menyu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div class="mobile liquid-glass lg-modal">
          <a [routerLink]="path()" (click)="close()">{{ t().nav.home }}</a>
          <a [routerLink]="path('katalog')" (click)="close()">{{ t().nav.catalog }}</a>
          @for (w of worlds; track w.id) {
            <a class="m-sub" [routerLink]="path('katalog', w.slug)" (click)="close()">
              <app-world-icon [world]="w.id" [size]="18" /> {{ t().catalog.worlds[w.id].name }}
            </a>
          }
          <a [routerLink]="path('biz-haqimizda')" (click)="close()">{{ t().nav.about }}</a>
          <a [routerLink]="path('aloqa')" (click)="close()">{{ t().nav.contact }}</a>
        </div>
      }
    </header>
  `,
  styles: [
    `
      .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 14px 16px;
        transition: padding var(--dur) var(--ease-glass);
      }
      .nav.scrolled {
        padding: 8px 16px;
      }
      .nav-inner {
        max-width: 1240px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 10px 18px;
        border-radius: var(--r-lg);
        transition:
          box-shadow var(--dur) var(--ease-glass),
          background var(--dur) var(--ease-glass);
      }
      .nav:not(.scrolled) .nav-inner {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        border-color: transparent;
        box-shadow: none;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
      }
      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
      }
      .brand-main {
        font-weight: 900;
        letter-spacing: 0.08em;
        color: var(--color-text);
        font-size: 1rem;
      }
      .brand-sub {
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.32em;
        color: var(--color-accent);
      }
      .links {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .links > a,
      .has-panel > a {
        padding: 8px 14px;
        border-radius: var(--r-pill);
        color: var(--color-text-muted);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition:
          color var(--dur),
          background var(--dur);
        white-space: nowrap;
      }
      .links a:hover,
      .has-panel:hover > a {
        color: var(--color-text);
        background: var(--color-surface);
      }
      .links a.active {
        color: var(--color-accent);
      }
      .has-panel {
        position: relative;
      }
      .panel {
        position: absolute;
        top: calc(100% + 14px);
        left: 50%;
        transform: translateX(-50%) translateY(8px);
        width: 380px;
        padding: 10px;
        display: grid;
        gap: 4px;
        opacity: 0;
        visibility: hidden;
        transition: all var(--dur) var(--ease-glass);
        border-radius: var(--r-lg);
      }
      .has-panel:hover .panel,
      .has-panel:focus-within .panel {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
      .panel-item {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 10px 12px;
        border-radius: var(--r-md);
        text-decoration: none;
        transition: background var(--dur);
      }
      .panel-item:hover {
        background: var(--color-surface);
      }
      .pi-icon {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--r-md);
        flex: none;
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.1);
      }
      .panel-item[data-accent='electric'] .pi-icon {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.1);
      }
      .panel-item[data-accent='glow'] .pi-icon {
        color: var(--color-accent-hi);
        background: rgba(255, 209, 102, 0.12);
      }
      .pi-name {
        display: block;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.9rem;
      }
      .pi-blurb {
        display: block;
        color: var(--color-text-muted);
        font-size: 0.76rem;
        margin-top: 2px;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .langs {
        display: flex;
        gap: 2px;
        padding: 3px;
        border-radius: var(--r-pill);
        background: var(--color-surface);
      }
      .langs button {
        border: none;
        background: transparent;
        color: var(--color-text-muted);
        font-weight: 700;
        font-size: 0.72rem;
        text-transform: uppercase;
        padding: 5px 9px;
        border-radius: var(--r-pill);
        cursor: pointer;
        transition: all var(--dur);
      }
      .langs button.on {
        background: var(--grad-brand);
        color: #07070c;
      }
      .icon-btn {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--r-md);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        color: var(--color-text);
        cursor: pointer;
        transition: all var(--dur);
      }
      .icon-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .burger {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
      .burger span {
        width: 18px;
        height: 2px;
        background: currentColor;
        border-radius: 2px;
        transition: all var(--dur);
      }
      .mobile {
        max-width: 1240px;
        margin: 10px auto 0;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        border-radius: var(--r-lg);
        animation: slide-in var(--dur) var(--ease-out-expo);
      }
      .mobile a {
        padding: 11px 14px;
        border-radius: var(--r-md);
        color: var(--color-text);
        text-decoration: none;
        font-weight: 600;
      }
      .mobile a:hover {
        background: var(--color-surface);
      }
      .mobile .m-sub {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 26px;
        color: var(--color-text-muted);
        font-size: 0.9rem;
      }
      @media (max-width: 900px) {
        .links {
          display: none;
        }
        .burger {
          display: flex;
        }
      }
      @media (max-width: 560px) {
        .langs {
          display: none;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  ts = inject(TranslationService);
  theme = inject(ThemeService);
  private router = inject(Router);
  scrolled = signal(false);
  menuOpen = signal(false);
  worlds = WORLDS;
  langList: Lang[] = ['uz', 'ru', 'en'];

  lang = this.ts.lang;
  path = this.ts.path.bind(this.ts);
  t = () => this.ts.t;

  constructor() {
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 30);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  close() {
    this.menuOpen.set(false);
  }
  switchLang(l: Lang) {
    this.ts.setLang(l);
    const segs = this.router.url.split('?')[0].split('/').filter(Boolean);
    if (segs[0] === 'ru' || segs[0] === 'en') segs.shift();
    this.router.navigate(l === 'uz' ? ['/', ...segs] : ['/', l, ...segs]);
    this.close();
  }
}
