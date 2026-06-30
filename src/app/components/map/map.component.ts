import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="location" class="section-padding map-section">
      <div class="container">
        <!-- Header -->
        <div class="section-header" appReveal>
          <div class="badge">
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
            {{ ts.t.location.subtitle }}
          </div>
          <h2 class="section-title">{{ ts.t.location.title }}</h2>
        </div>

        <div class="map-layout">
          <!-- Info cards -->
          <div class="map-info" appReveal [revealDelay]="1">
            <div class="info-card glass-card">
              <div class="ic-icon loc-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"
                  />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span class="ic-label">{{ ts.t.location.address }}</span>
                <span class="ic-val">{{ ts.t.location.addressVal }}</span>
              </div>
            </div>

            <div class="info-card glass-card">
              <div class="ic-icon map-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
              </div>
              <div>
                <span class="ic-label">{{ ts.t.location.district }}</span>
                <span class="ic-val">{{ ts.t.location.districtVal }}</span>
              </div>
            </div>

            <div class="info-card glass-card">
              <div class="ic-icon time-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <span class="ic-label">{{ ts.t.location.hours }}</span>
                <span class="ic-val">{{ ts.t.location.hoursVal }}</span>
              </div>
            </div>

            <!-- Navigate button -->
            <a [href]="yandexUrl" target="_blank" rel="noopener" class="btn-primary navigate-btn">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {{ ts.t.location.navigate }}
            </a>
          </div>

          <!-- Map iframe -->
          <div class="map-frame-wrap" appReveal [revealDelay]="2">
            <div class="map-frame glass-card">
              <iframe
                [src]="mapSrc"
                width="100%"
                height="100%"
                loading="lazy"
                frameborder="0"
                allowfullscreen="true"
                style="border-radius:18px;border:none;display:block;"
                title="Xonqiz Nur location"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      .map-section {
        position: relative;
        overflow: hidden;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .section-header {
        text-align: center;
        margin-bottom: 52px;
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

      .map-layout {
        display: grid;
        grid-template-columns: 340px 1fr;
        gap: 24px;
        align-items: start;
      }

      .map-info {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .info-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
      }
      .ic-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .loc-icon {
        background: rgba(245, 166, 35, 0.1);
        color: var(--color-accent);
        border: 1px solid rgba(245, 166, 35, 0.2);
      }
      .map-icon {
        background: rgba(74, 222, 128, 0.1);
        color: #4ade80;
        border: 1px solid rgba(74, 222, 128, 0.2);
      }
      .time-icon {
        background: rgba(79, 195, 247, 0.1);
        color: var(--color-electric);
        border: 1px solid rgba(79, 195, 247, 0.2);
      }

      .ic-label {
        display: block;
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--color-text-muted);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 3px;
      }
      .ic-val {
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-text);
      }

      .navigate-btn {
        width: 100%;
        justify-content: center;
        margin-top: 8px;
      }

      .map-frame-wrap {
        height: 420px;
      }
      .map-frame {
        height: 100%;
        padding: 6px;
        overflow: hidden;
      }

      @media (max-width: 900px) {
        .map-layout {
          grid-template-columns: 1fr;
        }
        .map-frame-wrap {
          height: 340px;
        }
      }
    `,
  ],
})
export class MapComponent {
  ts = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);

  yandexUrl = 'https://yandex.uz/maps/?pt=71.520984,40.291645&z=16&l=map';

  get mapSrc(): SafeResourceUrl {
    const url =
      'https://yandex.uz/map-widget/v1/?ll=71.520984%2C40.291645&z=16&l=map&pt=71.520984,40.291645,pm2rdl';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
