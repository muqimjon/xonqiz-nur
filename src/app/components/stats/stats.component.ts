import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, CountUpDirective],
  template: `
    <section class="section-padding">
      <div class="container">
        <div class="band liquid-glass" appReveal>
          @for (s of t().stats.items; track s.label) {
            <div class="stat">
              <span class="val" appCountUp [countTo]="s.value" [countSuffix]="s.suffix">{{ s.value }}{{ s.suffix }}</span>
              <span class="label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .band {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        padding: 44px 32px;
        border-radius: var(--r-xl);
        text-align: center;
      }
      .stat {
        position: relative;
      }
      .stat + .stat::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 50px;
        background: var(--color-border-strong);
      }
      .val {
        display: block;
        font-family: 'Space Mono', monospace;
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        background: var(--grad-brand);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .label {
        display: block;
        color: var(--color-text-muted);
        font-size: 0.85rem;
        margin-top: 6px;
      }
      @media (max-width: 700px) {
        .band {
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 16px;
        }
        .stat:nth-child(odd) + .stat::before {
          display: none;
        }
      }
    `,
  ],
})
export class StatsComponent {
  private ts = inject(TranslationService);
  t = () => this.ts.t;
}
