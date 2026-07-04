import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { LogoComponent } from '../../shared/logo.component';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, TiltDirective, LogoComponent],
  template: `
    <section class="section-padding" id="about">
      <div class="container grid">
        <div class="left" appReveal>
          <span class="badge">{{ t().about.title }}</span>
          <h2>{{ t().about.subtitle }}</h2>
          <p>{{ t().about.desc1 }}</p>
          <p>{{ t().about.desc2 }}</p>
          <p>{{ t().about.desc3 }}</p>
          <div class="legal liquid-glass">
            <div class="row"><span>{{ t().about.tinLabel }}</span><b>309002339</b></div>
            <div class="row"><span>{{ t().about.sctaLabel }}</span><b>47540</b></div>
            <div class="row"><span>{{ t().about.regLabel }}</span><b>{{ t().about.regDate }}</b></div>
          </div>
          @if (showCta()) {
            <a class="btn-glass cta" [routerLink]="path('biz-haqimizda')">{{ t().about.cta }}</a>
          }
        </div>

        <div class="right">
          <div class="features">
            @for (f of t().about.features; track f.title; let i = $index) {
              <article class="fcard liquid-glass lg-card" appReveal [revealDelay]="i + 1" appTilt [tiltMax]="5">
                <h3>{{ f.title }}</h3>
                <p>{{ f.desc }}</p>
              </article>
            }
          </div>
          <div class="brand-card" appReveal [revealDelay]="2" appTilt [tiltMax]="6">
            <app-logo [size]="52" />
            <div>
              <div class="bc-main">XONQIZ NUR</div>
              <div class="bc-sub">xususiy korxona</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 48px;
        align-items: start;
      }
      h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin: 14px 0 20px;
      }
      .left p {
        color: var(--color-text-muted);
        line-height: 1.75;
        margin-bottom: 14px;
        max-width: 56ch;
      }
      .legal {
        padding: 18px 22px;
        border-radius: var(--r-md);
        margin: 22px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
      }
      .row span {
        color: var(--color-text-muted);
      }
      .row b {
        font-family: 'Space Mono', monospace;
        color: var(--color-text);
        font-variant-numeric: tabular-nums;
      }
      .cta {
        display: inline-flex;
      }
      .features {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .fcard:first-child {
        grid-column: span 2;
      }
      .fcard h3 {
        font-size: 1.05rem;
        font-weight: 800;
        margin-bottom: 8px;
      }
      .fcard p {
        color: var(--color-text-muted);
        font-size: 0.88rem;
        line-height: 1.55;
      }
      .brand-card {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px;
        border-radius: var(--r-lg);
        background:
          radial-gradient(circle at 80% 20%, var(--color-glow), transparent 60%),
          var(--grad-brand);
        color: #07070c;
      }
      .bc-main {
        font-weight: 900;
        letter-spacing: 0.05em;
        font-size: 1.1rem;
      }
      .bc-sub {
        font-size: 0.8rem;
        opacity: 0.7;
      }
      @media (max-width: 900px) {
        .grid {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }
    `,
  ],
})
export class AboutComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  path = this.ts.path.bind(this.ts);
  t = () => this.ts.t;
  showCta = input(true);
}
