import { Component, ChangeDetectionStrategy, signal, afterNextRender, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (show()) {
      <div class="promo-overlay" (click)="close()">
        <div class="promo-card liquid-glass" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <button class="promo-x" (click)="close()" aria-label="✕">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <span class="promo-badge">{{ t().promo.badge }}</span>
          <div class="promo-domain">xonqiz.uz</div>
          <h2>{{ t().promo.title }}</h2>
          <p>{{ t().promo.body }}</p>
          <a class="btn-liquid promo-cta" href="https://t.me/MuqimjonMamadaliyev" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.9 4.3 18.6 19.9c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6 12.1l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.8-.3 1.6.2 1.3 1.4z"
              />
            </svg>
            {{ t().promo.cta }}
          </a>
          <button class="promo-later" (click)="close()">{{ t().promo.later }}</button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .promo-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(3, 4, 10, 0.55);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        animation: promo-fade var(--dur) var(--ease-glass);
      }
      .promo-card {
        position: relative;
        width: 100%;
        max-width: 440px;
        padding: 36px 30px 26px;
        border-radius: var(--r-xl);
        text-align: center;
        animation: promo-pop var(--dur-slow) var(--ease-spring);
      }
      .promo-x {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border: none;
        border-radius: var(--r-pill);
        cursor: pointer;
        color: var(--color-text-muted);
        background: transparent;
        transition:
          background var(--dur-fast) var(--ease-glass),
          color var(--dur-fast) var(--ease-glass);
      }
      .promo-x:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--color-text);
      }
      .promo-badge {
        display: inline-block;
        margin-bottom: 18px;
        padding: 5px 14px;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-accent);
        background: color-mix(in srgb, var(--color-accent) 14%, transparent);
        border-radius: var(--r-pill);
      }
      .promo-domain {
        margin: 0 0 14px;
        font-size: clamp(2.1rem, 9vw, 2.7rem);
        font-weight: 900;
        letter-spacing: -0.02em;
        line-height: 1;
        background: var(--grad-brand);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
      .promo-card h2 {
        margin: 0 0 10px;
        font-size: 1.18rem;
        font-weight: 800;
        color: var(--color-text);
      }
      .promo-card p {
        margin: 0 0 24px;
        font-size: 0.98rem;
        line-height: 1.6;
        color: var(--color-text-muted);
      }
      .promo-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        width: 100%;
      }
      .promo-cta svg {
        flex-shrink: 0;
      }
      .promo-later {
        display: block;
        width: 100%;
        margin-top: 14px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 0.88rem;
        color: var(--color-text-faint);
        transition: color var(--dur-fast) var(--ease-glass);
      }
      .promo-later:hover {
        color: var(--color-text);
      }
      @keyframes promo-fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes promo-pop {
        from {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .promo-overlay,
        .promo-card {
          animation: none;
        }
      }
    `,
  ],
})
export class PromoModalComponent {
  private ts = inject(TranslationService);
  t = () => this.ts.t;
  show = signal(false);

  constructor() {
    afterNextRender(() => {
      try {
        if (sessionStorage.getItem('xn-promo-seen')) return;
      } catch {}
      setTimeout(() => this.show.set(true), 1200);
    });
  }

  close() {
    this.show.set(false);
    try {
      sessionStorage.setItem('xn-promo-seen', '1');
    } catch {}
  }
}
