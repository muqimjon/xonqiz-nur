import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { LightningComponent } from '../../shared/lightning.component';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, MagneticDirective, LightningComponent],
  template: `
    <section class="spotlight">
      <div class="bg" aria-hidden="true">
        <span class="halo"></span>
        <div class="bolt-zone"><xn-lightning color="amber" /></div>
      </div>
      <div class="container inner">
        <div class="art" appReveal>
          <svg viewBox="0 0 300 380" fill="none" aria-hidden="true">
            <line x1="150" y1="0" x2="150" y2="70" stroke="var(--color-border-strong)" stroke-width="2" />
            <circle cx="150" cy="74" r="7" fill="url(#xn-grad-bolt)" />
            <path d="M150 80 C90 110 70 120 60 175 M150 80 C210 110 230 120 240 175 M150 80 V150 M150 80 C120 115 110 130 110 175 M150 80 C180 115 190 130 190 175"
              stroke="var(--color-border-strong)" stroke-width="2" fill="none" stroke-linecap="round" />
            @for (b of bulbs; track b.x) {
              <g class="bulb" [style.--d]="b.d + 's'">
                <circle [attr.cx]="b.x" [attr.cy]="b.y" r="18" class="glow" />
                <path [attr.d]="bulbPath(b.x, b.y)" class="glass" />
                <path [attr.d]="filament(b.x, b.y)" class="fila" />
              </g>
            }
          </svg>
        </div>
        <div class="copy" appReveal [revealDelay]="1">
          <span class="badge">{{ t().spotlight.badge }}</span>
          <h2>{{ t().spotlight.heading }}</h2>
          <p class="sub">{{ t().spotlight.sub }}</p>
          <p class="body">{{ t().spotlight.body }}</p>
          <div class="chips">
            @for (c of t().spotlight.chips; track c) {
              <span class="chip">{{ c }}</span>
            }
          </div>
          <div class="cta">
            <a class="btn-liquid" appMagnetic [routerLink]="path('katalog', 'dizayn')">{{ t().spotlight.cta }}</a>
            <a class="btn-glass" href="https://t.me/xonqiznur" target="_blank" rel="noopener">{{ t().spotlight.cta2 }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .spotlight {
        position: relative;
        padding: var(--space-9) 0;
        overflow: hidden;
      }
      .bg {
        position: absolute;
        inset: 0;
        z-index: 0;
      }
      .halo {
        position: absolute;
        left: 18%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 460px;
        height: 460px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 209, 102, 0.22), transparent 65%);
        filter: blur(20px);
      }
      .bolt-zone {
        position: absolute;
        left: 6%;
        top: 0;
        width: 26%;
        height: 60%;
        opacity: 0.5;
      }
      .inner {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        align-items: center;
        gap: 40px;
      }
      .art {
        display: grid;
        place-items: center;
      }
      .art svg {
        width: min(360px, 80%);
        overflow: visible;
      }
      .bulb {
        animation: glow-pulse 3s ease-in-out infinite;
        animation-delay: var(--d);
        transform-origin: center;
      }
      .glow {
        fill: var(--color-accent-hi);
        filter: blur(9px);
        opacity: 0.7;
      }
      .glass {
        fill: rgba(255, 240, 200, 0.18);
        stroke: rgba(255, 209, 102, 0.55);
        stroke-width: 1.2;
      }
      .fila {
        stroke: var(--color-accent-hi);
        stroke-width: 1.4;
        fill: none;
      }
      h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin: 14px 0 6px;
      }
      .sub {
        font-size: 1.1rem;
        color: var(--color-accent);
        font-weight: 600;
        margin-bottom: 16px;
      }
      .body {
        color: var(--color-text-muted);
        line-height: 1.75;
        max-width: 50ch;
      }
      .chips {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin: 22px 0 28px;
      }
      .chip {
        padding: 7px 15px;
        border-radius: var(--r-pill);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-text);
      }
      .cta {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      @media (max-width: 900px) {
        .inner {
          grid-template-columns: 1fr;
          text-align: center;
        }
        .copy {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .chips,
        .cta {
          justify-content: center;
        }
        .art {
          order: -1;
        }
      }
    `,
  ],
})
export class SpotlightComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  path = this.ts.path.bind(this.ts);
  t = () => this.ts.t;
  bulbs = [
    { x: 60, y: 178, d: 0 },
    { x: 110, y: 200, d: 0.4 },
    { x: 150, y: 212, d: 0.8 },
    { x: 190, y: 200, d: 0.4 },
    { x: 240, y: 178, d: 0.2 },
  ];
  bulbPath(x: number, y: number): string {
    return `M${x - 9} ${y} a9 9 0 1 1 18 0 q0 7 -5 11 h-8 q-5 -4 -5 -11 Z`;
  }
  filament(x: number, y: number): string {
    return `M${x - 3} ${y + 11} v-4 l3 -3 l-3 -3 l3 -3 v-2`;
  }
}
