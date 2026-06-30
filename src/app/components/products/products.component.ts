import {
  Component,
  inject,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="products" class="section-padding" style="position:relative;overflow:hidden">
      <div class="orb-bg"></div>
      <div class="container">
        <!-- Header -->
        <div class="section-header fade-up">
          <div class="badge">
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
            {{ ts.t.products.subtitle }}
          </div>
          <h2 class="section-title">{{ ts.t.products.title }}</h2>
        </div>

        <!-- Two columns -->
        <div class="products-grid">
          <!-- Electric -->
          <div class="product-col glass-card fade-up delay-1">
            <div class="col-header">
              <div class="col-icon electric-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 class="col-title">{{ ts.t.products.electric }}</h3>
            </div>
            <ul class="product-list">
              @for (item of ts.t.products.electricItems; track item; let i = $index) {
                <li class="product-item" [style.animation-delay]="i * 0.05 + 's'">
                  <span class="item-dot electric-dot"></span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
            <div class="col-footer electric-footer">
              <span>⚡ +200 {{ moreLabel }}</span>
            </div>
          </div>

          <!-- Plumbing -->
          <div class="product-col glass-card fade-up delay-2">
            <div class="col-header">
              <div class="col-icon water-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
                  />
                </svg>
              </div>
              <h3 class="col-title">{{ ts.t.products.plumbing }}</h3>
            </div>
            <ul class="product-list">
              @for (item of ts.t.products.plumbingItems; track item; let i = $index) {
                <li class="product-item" [style.animation-delay]="i * 0.05 + 's'">
                  <span class="item-dot water-dot"></span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
            <div class="col-footer water-footer">
              <span>💧 +300 {{ moreLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .orb-bg {
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(79, 195, 247, 0.05) 0%, transparent 70%);
        top: -200px;
        right: -200px;
        pointer-events: none;
        filter: blur(60px);
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }
      .section-header {
        text-align: center;
        margin-bottom: 56px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
      .section-title {
        font-size: clamp(2rem, 5vw, 3.2rem);
        font-weight: 900;
        letter-spacing: -0.03em;
      }

      .products-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      .product-col {
        padding: 36px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .col-header {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .col-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .electric-icon {
        background: rgba(245, 166, 35, 0.12);
        color: var(--color-accent);
        border: 1px solid rgba(245, 166, 35, 0.2);
      }
      .water-icon {
        background: rgba(79, 195, 247, 0.1);
        color: var(--color-electric);
        border: 1px solid rgba(79, 195, 247, 0.2);
      }

      .col-title {
        font-size: 1.3rem;
        font-weight: 800;
      }

      .product-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      .product-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 0;
        font-size: 0.93rem;
        color: var(--color-text-muted);
        border-bottom: 1px solid var(--color-border);
        transition: color 0.2s ease;
      }
      .product-item:last-child {
        border-bottom: none;
      }
      .product-item:hover {
        color: var(--color-text);
      }
      .item-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .electric-dot {
        background: var(--color-accent);
      }
      .water-dot {
        background: var(--color-electric);
      }

      .col-footer {
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 0.82rem;
        font-weight: 600;
      }
      .electric-footer {
        background: rgba(245, 166, 35, 0.07);
        color: var(--color-accent);
      }
      .water-footer {
        background: rgba(79, 195, 247, 0.07);
        color: var(--color-electric);
      }

      @media (max-width: 768px) {
        .products-grid {
          grid-template-columns: 1fr;
        }
        .product-col {
          padding: 24px;
        }
      }
    `,
  ],
})
export class ProductsComponent {
  ts = inject(TranslationService);
  get moreLabel() {
    const l = this.ts.lang();
    if (l === 'uz') return 'dan ortiq mahsulot';
    if (l === 'ru') return 'видов и больше';
    return 'more types';
  }
}
