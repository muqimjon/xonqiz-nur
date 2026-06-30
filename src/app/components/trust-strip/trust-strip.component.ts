import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-trust-strip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <div class="container">
      <div class="strip liquid-glass" appReveal>
        <div class="chip"><span class="dot d1"></span>{{ t().trust.since }}</div>
        <div class="chip"><span class="dot d2"></span>{{ t().trust.registered }}</div>
        <div class="chip"><span class="dot d3"></span>{{ t().trust.products }}</div>
        <div class="chip"><span class="dot d4"></span>{{ t().trust.wholesale }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: -40px;
        position: relative;
        z-index: 5;
      }
      .strip {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 14px 30px;
        padding: 18px 28px;
        border-radius: var(--r-lg);
      }
      .chip {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-text);
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .d1 {
        background: var(--color-accent);
      }
      .d2 {
        background: var(--color-electric);
      }
      .d3 {
        background: var(--color-aux-green);
      }
      .d4 {
        background: var(--color-aux-violet);
      }
      @media (max-width: 560px) {
        .chip {
          font-size: 0.78rem;
        }
      }
    `,
  ],
})
export class TrustStripComponent {
  private ts = inject(TranslationService);
  t = () => this.ts.t;
}
