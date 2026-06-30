import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { HeroCoreComponent } from '../../shared/hero-core.component';
import { WaterCanvasComponent } from '../../shared/water-canvas.component';
import { CountUpDirective } from '../../shared/count-up.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HeroCoreComponent, WaterCanvasComponent, CountUpDirective, MagneticDirective],
  template: `
    <section class="hero" id="home">
      <div class="bg" aria-hidden="true">
        <span class="aurora"></span>
        <span class="grid"></span>
        <span class="orb orb-a"></span>
        <span class="orb orb-b"></span>
      </div>
      <xn-water-canvas />

      <div class="container inner">
        <div class="copy">
          <span class="badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {{ t().hero.badge }}
          </span>
          <h1>
            <span>{{ t().hero.title1 }}</span>
            <span class="grad-text">{{ t().hero.title2 }}</span>
            <span>{{ t().hero.title3 }}</span>
          </h1>
          <p class="desc">{{ t().hero.desc }}</p>
          <div class="cta">
            <a class="btn-liquid" appMagnetic [routerLink]="['/', lang(), 'aloqa']">
              {{ t().hero.cta }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a class="btn-glass" [routerLink]="['/', lang(), 'katalog']">{{ t().hero.ctaSecondary }}</a>
          </div>

          <div class="stats liquid-glass">
            @for (s of t().hero.stats; track s.label; let i = $index) {
              @if (i > 0) {
                <span class="sep"></span>
              }
              <div class="stat">
                <span class="stat-val" appCountUp [countTo]="s.value" [countSuffix]="s.suffix">
                  {{ s.value }}{{ s.suffix }}
                </span>
                <span class="stat-label">{{ s.label }}</span>
              </div>
            }
          </div>
        </div>

        <div class="visual">
          <xn-hero-core />
        </div>
      </div>

      <div class="scroll-hint" aria-hidden="true"><span></span></div>
    </section>
  `,
  styles: [
    `
      .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 120px 0 80px;
      }
      .bg {
        position: absolute;
        inset: 0;
        z-index: 0;
      }
      .aurora {
        position: absolute;
        inset: -20%;
        background: var(--grad-aurora);
        filter: blur(70px);
        opacity: 0.55;
        animation: aurora-drift 18s ease-in-out infinite;
      }
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(var(--color-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%);
        opacity: 0.5;
      }
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.5;
      }
      .orb-a {
        width: 460px;
        height: 460px;
        background: var(--glow-amber);
        top: -120px;
        left: -80px;
        animation: float 12s ease-in-out infinite;
      }
      .orb-b {
        width: 420px;
        height: 420px;
        background: var(--glow-electric);
        bottom: -140px;
        right: -60px;
        animation: float 14s ease-in-out infinite reverse;
      }
      .inner {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        align-items: center;
        gap: 40px;
      }
      h1 {
        font-size: var(--fs-display);
        font-weight: 900;
        line-height: 1.02;
        letter-spacing: -0.035em;
        margin: 22px 0 20px;
      }
      h1 span {
        display: block;
      }
      .grad-text {
        text-shadow: 0 0 60px var(--color-glow);
      }
      .desc {
        font-size: var(--fs-body);
        color: var(--color-text-muted);
        max-width: 540px;
        line-height: 1.7;
      }
      .cta {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        margin: 30px 0 36px;
      }
      .stats {
        display: inline-flex;
        align-items: center;
        gap: 22px;
        padding: 18px 26px;
        border-radius: var(--r-lg);
      }
      .stat {
        display: flex;
        flex-direction: column;
      }
      .stat-val {
        font-family: 'Space Mono', monospace;
        font-size: 1.7rem;
        font-weight: 700;
        color: var(--color-accent);
        font-variant-numeric: tabular-nums;
      }
      .stat-label {
        font-size: 0.74rem;
        color: var(--color-text-muted);
        margin-top: 2px;
      }
      .sep {
        width: 1px;
        height: 36px;
        background: var(--color-border-strong);
      }
      .visual {
        display: grid;
        place-items: center;
      }
      .scroll-hint {
        position: absolute;
        bottom: 26px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 48px;
        border-radius: 2px;
        background: var(--color-border-strong);
        overflow: hidden;
        z-index: 2;
      }
      .scroll-hint span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background: var(--color-accent);
        animation: scrolldown 2s ease-in-out infinite;
      }
      @keyframes scrolldown {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(250%);
        }
      }
      @media (max-width: 1024px) {
        .inner {
          grid-template-columns: 1fr;
          text-align: center;
        }
        .copy {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .visual {
          order: -1;
        }
        .cta {
          justify-content: center;
        }
      }
      @media (max-width: 560px) {
        .stats {
          gap: 14px;
          padding: 14px 18px;
        }
        .stat-val {
          font-size: 1.35rem;
        }
      }
    `,
  ],
})
export class HeroComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  t = () => this.ts.t;
}
