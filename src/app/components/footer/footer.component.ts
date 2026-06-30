import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="divider"></div>
      <div class="container">
        <div class="footer-inner">
          <!-- Logo -->
          <div class="footer-brand">
            <a href="#home" class="footer-logo">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.2)" stroke-width="1"/>
                <path d="M20 5L10 20H18L16 31L26 16H18L20 5Z" fill="#f5a623"/>
                <circle cx="11" cy="27" r="2.5" fill="#4fc3f7" opacity="0.8"/>
              </svg>
              <div>
                <div class="footer-logo-main">XONQIZ NUR</div>
                <div class="footer-logo-sub">{{ ts.t.footer.tagline }}</div>
              </div>
            </a>
            <p class="footer-tin">TIN: 309002339 | SCTEA: 47540</p>
          </div>

          <!-- Links -->
          <nav class="footer-nav">
            <a href="#home">{{ ts.t.nav.home }}</a>
            <a href="#products">{{ ts.t.nav.products }}</a>
            <a href="#about">{{ ts.t.nav.about }}</a>
            <a href="#location">{{ ts.t.nav.location }}</a>
            <a href="#contact">{{ ts.t.nav.contact }}</a>
          </nav>

          <!-- Contacts mini -->
          <div class="footer-contacts">
            <a href="tel:+998990600524">+998 99 060 05 24</a>
            <a href="tel:+998935137890">+998 93 513 78 90</a>
            <a href="https://t.me/xonqiznur" target="_blank">&#64;xonqiznur</a>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-copy">© 2021–{{ year }} "XONQIZ NUR" xususiy korxonasi. {{ ts.t.footer.rights }}.</span>
          <div class="footer-accent-line"></div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { padding: 48px 0 32px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    .footer-inner {
      display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 40px;
      padding-bottom: 40px;
    }

    .footer-brand { display: flex; flex-direction: column; gap: 12px; }
    .footer-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .footer-logo-main { font-size: 0.95rem; font-weight: 900; color: var(--color-text); letter-spacing: 0.05em; }
    .footer-logo-sub { font-size: 0.72rem; color: var(--color-text-muted); font-weight: 500; }
    .footer-tin { font-size: 0.75rem; color: var(--color-text-muted); font-family: 'Space Mono', monospace; }

    .footer-nav { display: flex; flex-direction: column; gap: 10px; }
    .footer-nav a, .footer-contacts a {
      color: var(--color-text-muted); text-decoration: none;
      font-size: 0.88rem; font-weight: 500; transition: color 0.2s ease;
    }
    .footer-nav a:hover, .footer-contacts a:hover { color: var(--color-accent); }

    .footer-contacts { display: flex; flex-direction: column; gap: 10px; }

    .footer-bottom {
      border-top: 1px solid var(--color-border); padding-top: 24px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      flex-wrap: wrap;
    }
    .footer-copy { font-size: 0.78rem; color: var(--color-text-muted); }
    .footer-accent-line {
      height: 2px; width: 48px; border-radius: 2px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-electric));
    }

    @media (max-width: 700px) {
      .footer-inner { grid-template-columns: 1fr; gap: 28px; }
      .footer-nav, .footer-contacts { flex-direction: row; flex-wrap: wrap; gap: 12px 20px; }
    }
  `]
})
export class FooterComponent {
  ts = inject(TranslationService);
  year = new Date().getFullYear();
}
