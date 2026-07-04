import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';

@Component({
  selector: 'app-why-us',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, TiltDirective],
  template: `
    <section class="section-padding">
      <div class="container">
        <header class="head" appReveal>
          <span class="badge">{{ t().whyUs.title }}</span>
          <h2>{{ t().whyUs.subtitle }}</h2>
        </header>
        <div class="grid">
          @for (f of t().whyUs.items; track f.title; let i = $index) {
            <article class="card liquid-glass lg-card" appReveal [revealDelay]="i" appTilt [tiltMax]="5">
              <span class="ic" [attr.data-i]="i">
                @switch (i) {
                  @case (0) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                      <path d="M3 7h18M3 12h18M3 17h12" />
                    </svg>
                  }
                  @case (1) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" /><path d="M9 12l2 2 4-4" />
                    </svg>
                  }
                  @case (2) {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  }
                  @default {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
                      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" /><path d="M9 21h6M10 18h4" />
                    </svg>
                  }
                }
              </span>
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
            </article>
          }
        </div>
        <div class="cta-row" appReveal>
          <a class="btn-glass" [routerLink]="path('aloqa')">
            {{ t().whyUs.inlineCta }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .head {
        text-align: center;
        margin-bottom: 48px;
      }
      h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin-top: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      .card {
        text-align: left;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 50px;
        height: 50px;
        border-radius: var(--r-md);
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.1);
        margin-bottom: 16px;
      }
      .ic svg {
        width: 26px;
        height: 26px;
      }
      .ic[data-i='1'],
      .ic[data-i='3'] {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.1);
      }
      h3 {
        font-size: 1.1rem;
        font-weight: 800;
        margin-bottom: 8px;
      }
      p {
        color: var(--color-text-muted);
        font-size: 0.92rem;
        line-height: 1.6;
      }
      .cta-row {
        text-align: center;
        margin-top: 40px;
      }
      @media (max-width: 900px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 520px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class WhyUsComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  path = this.ts.path.bind(this.ts);
  t = () => this.ts.t;
}
