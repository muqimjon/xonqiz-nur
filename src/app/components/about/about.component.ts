import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section-padding about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Left: Text -->
          <div class="about-text fade-up">
            <div class="badge">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" fill="currentColor" />
              </svg>
              {{ ts.t.about.subtitle }}
            </div>
            <h2 class="section-title">{{ ts.t.about.title }}</h2>
            <p class="about-desc">{{ ts.t.about.desc1 }}</p>
            <p class="about-desc">{{ ts.t.about.desc2 }}</p>

            <!-- Company info -->
            <div class="company-info">
              <div class="info-row">
                <span class="info-label">TIN</span>
                <span class="info-val">309002339</span>
              </div>
              <div class="info-row">
                <span class="info-label">SCTEA</span>
                <span class="info-val">47540</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ regLabel }}</span>
                <span class="info-val">29.10.2021</span>
              </div>
            </div>
          </div>

          <!-- Right: Feature cards -->
          <div class="features-grid fade-up delay-2">
            <div class="feature-card glass-card">
              <div class="feat-icon electric-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                  />
                  <line x1="12" y1="12" x2="12" y2="12" />
                </svg>
              </div>
              <h4>{{ ts.t.about.feature1 }}</h4>
              <p>{{ ts.t.about.feature1d }}</p>
            </div>
            <div class="feature-card glass-card">
              <div class="feat-icon accent-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h4>{{ ts.t.about.feature2 }}</h4>
              <p>{{ ts.t.about.feature2d }}</p>
            </div>
            <div class="feature-card glass-card">
              <div class="feat-icon water-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4>{{ ts.t.about.feature3 }}</h4>
              <p>{{ ts.t.about.feature3d }}</p>
            </div>
            <!-- Decorative element -->
            <div class="deco-card">
              <div class="deco-logo">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="14"
                    fill="rgba(245,166,35,0.1)"
                    stroke="rgba(245,166,35,0.2)"
                    stroke-width="1"
                  />
                  <path d="M28 6L14 26H24L22 42L34 22H24L28 6Z" fill="url(#dg1)" />
                  <circle cx="15" cy="36" r="3.5" fill="#4fc3f7" opacity="0.8" />
                  <defs>
                    <linearGradient id="dg1" x1="14" y1="6" x2="34" y2="42">
                      <stop offset="0%" stop-color="#ffd166" />
                      <stop offset="100%" stop-color="#f5a623" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span class="deco-text">XONQIZ NUR</span>
              <span class="deco-sub">xususiy korxona</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .about-section {
        background: var(--color-bg2);
        position: relative;
        overflow: hidden;
      }
      .about-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent);
      }
      .about-section::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: start;
      }

      .about-text {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .section-title {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 900;
        letter-spacing: -0.03em;
      }
      .about-desc {
        font-size: 0.97rem;
        line-height: 1.75;
        color: var(--color-text-muted);
      }

      .company-info {
        display: flex;
        flex-direction: column;
        gap: 0;
        background: var(--color-surface);
        border-radius: 14px;
        border: 1px solid var(--color-border);
        overflow: hidden;
        margin-top: 8px;
      }
      .info-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        border-bottom: 1px solid var(--color-border);
      }
      .info-row:last-child {
        border-bottom: none;
      }
      .info-label {
        font-size: 0.8rem;
        color: var(--color-text-muted);
        font-weight: 600;
        letter-spacing: 0.04em;
      }
      .info-val {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--color-text);
        font-family: 'Space Mono', monospace;
      }

      .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .feature-card {
        padding: 28px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .feat-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .electric-icon {
        background: rgba(245, 166, 35, 0.1);
        color: var(--color-accent);
      }
      .accent-icon {
        background: rgba(74, 222, 128, 0.1);
        color: #4ade80;
      }
      .water-icon {
        background: rgba(79, 195, 247, 0.1);
        color: var(--color-electric);
      }
      .feature-card h4 {
        font-size: 1rem;
        font-weight: 800;
      }
      .feature-card p {
        font-size: 0.83rem;
        color: var(--color-text-muted);
        line-height: 1.6;
      }

      .deco-card {
        background: linear-gradient(135deg, rgba(245, 166, 35, 0.08), rgba(79, 195, 247, 0.05));
        border: 1px solid rgba(245, 166, 35, 0.15);
        border-radius: 20px;
        padding: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-align: center;
      }
      .deco-text {
        font-size: 1rem;
        font-weight: 900;
        color: var(--color-text);
        letter-spacing: 0.05em;
      }
      .deco-sub {
        font-size: 0.72rem;
        color: var(--color-text-muted);
        font-weight: 500;
      }

      .regLabel {
        text-transform: capitalize;
      }

      @media (max-width: 900px) {
        .about-grid {
          grid-template-columns: 1fr;
          gap: 40px;
        }
        .features-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      @media (max-width: 480px) {
        .features-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AboutComponent {
  ts = inject(TranslationService);
  get regLabel() {
    const l = this.ts.lang();
    if (l === 'uz') return "Ro'yxatga olingan";
    if (l === 'ru') return 'Зарегистрировано';
    return 'Registered';
  }
}
