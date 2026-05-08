import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="section-padding contact-section">
      <div class="container">
        <!-- Header -->
        <div class="section-header fade-up">
          <div class="badge">
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
            {{ ts.t.contact.subtitle }}
          </div>
          <h2 class="section-title">{{ ts.t.contact.title }}</h2>
        </div>

        <div class="contact-grid">
          <!-- Phone 1 -->
          <a href="tel:+998990600524" class="contact-card glass-card">
            <div class="cc-icon phone-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div class="cc-content">
              <span class="cc-label">{{ ts.t.contact.phone }} 1</span>
              <span class="cc-val">+998 99 060 05 24</span>
            </div>
            <div class="cc-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>

          <!-- Phone 2 -->
          <a href="tel:+998935137890" class="contact-card glass-card">
            <div class="cc-icon phone-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div class="cc-content">
              <span class="cc-label">{{ ts.t.contact.phone }} 2</span>
              <span class="cc-val">+998 93 513 78 90</span>
            </div>
            <div class="cc-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>

          <!-- Telegram -->
          <a href="https://t.me/xonqiznur" target="_blank" rel="noopener" class="contact-card glass-card">
            <div class="cc-icon tg-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
              </svg>
            </div>
            <div class="cc-content">
              <span class="cc-label">{{ ts.t.contact.telegram }}</span>
              <span class="cc-val">&#64;xonqiznur</span>
            </div>
            <div class="cc-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>

          <!-- Email -->
          <a href="mailto:raximov1990@umail.uz" class="contact-card glass-card">
            <div class="cc-icon email-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div class="cc-content">
              <span class="cc-label">{{ ts.t.contact.email }}</span>
              <span class="cc-val">raximov1990&#64;umail.uz</span>
            </div>
            <div class="cc-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>

          <!-- Address (full width) -->
          <div class="contact-card address-card glass-card">
            <div class="cc-icon addr-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="cc-content">
              <span class="cc-label">{{ ts.t.contact.address }}</span>
              <span class="cc-val">{{ ts.t.contact.addressVal }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: var(--color-bg2); position: relative; overflow: hidden;
    }
    .contact-section::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-border-strong), transparent);
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section-header { text-align: center; margin-bottom: 52px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .section-title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; letter-spacing: -0.03em; }

    .contact-grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
      max-width: 720px; margin: 0 auto;
    }

    .contact-card {
      display: flex; align-items: center; gap: 16px; padding: 24px;
      text-decoration: none; color: inherit; cursor: pointer;
    }

    .cc-icon {
      width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s ease;
    }
    .contact-card:hover .cc-icon { transform: scale(1.1) rotate(5deg); }

    .phone-icon { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.2); }
    .tg-icon { background: rgba(79,195,247,0.1); color: #29b6f6; border: 1px solid rgba(79,195,247,0.2); }
    .email-icon { background: rgba(245,166,35,0.1); color: var(--color-accent); border: 1px solid rgba(245,166,35,0.2); }
    .addr-icon { background: rgba(167,139,250,0.1); color: #a78bfa; border: 1px solid rgba(167,139,250,0.2); }

    .cc-content { flex: 1; min-width: 0; }
    .cc-label { display: block; font-size: 0.72rem; font-weight: 700; color: var(--color-text-muted); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px; }
    .cc-val { display: block; font-size: 0.93rem; font-weight: 700; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .cc-arrow { color: var(--color-text-muted); transition: all 0.3s ease; flex-shrink: 0; }
    .contact-card:hover .cc-arrow { color: var(--color-accent); transform: translate(2px, -2px); }

    .address-card { grid-column: 1 / -1; }
    .address-card .cc-val { white-space: normal; }

    @media (max-width: 600px) {
      .contact-grid { grid-template-columns: 1fr; }
      .address-card { grid-column: 1; }
    }
  `]
})
export class ContactComponent {
  ts = inject(TranslationService);
}
