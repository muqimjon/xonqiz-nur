import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LogoComponent } from '../../shared/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LogoComponent],
  template: `
    <footer class="footer">
      <div class="divider"></div>
      <div class="container">
        <div class="inner">
          <div class="brand">
            <a class="logo" [routerLink]="path()">
              <app-logo [size]="40" />
              <span>
                <span class="main">XONQIZ NUR</span>
                <span class="sub">{{ t().footer.tagline }}</span>
              </span>
            </a>
            <p class="tin">STIR: 309002339 &nbsp;|&nbsp; SCTEA: 47540</p>
          </div>

          <nav class="col">
            <span class="col-title">{{ t().footer.nav }}</span>
            <a [routerLink]="path()">{{ t().nav.home }}</a>
            <a [routerLink]="path('katalog')">{{ t().nav.catalog }}</a>
            <a [routerLink]="path('biz-haqimizda')">{{ t().nav.about }}</a>
            <a [routerLink]="path('aloqa')">{{ t().nav.contact }}</a>
          </nav>

          <div class="col">
            <span class="col-title">{{ t().footer.contactTitle }}</span>
            <a href="tel:+998990600524">+998 99 060 05 24</a>
            <a href="tel:+998935137890">+998 93 513 78 90</a>
            <a href="https://t.me/xonqiznur" target="_blank" rel="noopener">&#64;xonqiznur</a>
            <a href="mailto:raximov1990@umail.uz">raximov1990&#64;umail.uz</a>
          </div>
        </div>

        <div class="bottom">
          <span class="copy">© 2021–{{ year }} "XONQIZ NUR" xususiy korxonasi. {{ t().footer.rights }}.</span>
          <a class="dev" href="https://t.me/MuqimjonMamadaliyev" target="_blank" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.9 4.3 18.6 19.9c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6 12.1l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.8-.3 1.6.2 1.3 1.4z"
              />
            </svg>
            {{ t().footer.dev }}
          </a>
          <div class="accent"></div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 56px 0 32px;
      }
      .inner {
        display: grid;
        grid-template-columns: 1.6fr 1fr 1fr;
        gap: 40px;
        padding: 40px 0;
      }
      .brand {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }
      .logo .main {
        display: block;
        font-weight: 900;
        letter-spacing: 0.05em;
        color: var(--color-text);
      }
      .logo .sub {
        display: block;
        font-size: 0.78rem;
        color: var(--color-text-muted);
        margin-top: 2px;
        max-width: 30ch;
      }
      .tin {
        font-size: 0.78rem;
        color: var(--color-text-muted);
        font-family: 'Space Mono', monospace;
      }
      .col {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .col-title {
        font-size: 0.74rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-faint);
        font-weight: 700;
      }
      .col a {
        color: var(--color-text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: color var(--dur);
      }
      .col a:hover {
        color: var(--color-accent);
      }
      .bottom {
        border-top: 1px solid var(--color-border);
        padding-top: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }
      .copy {
        font-size: 0.78rem;
        color: var(--color-text-muted);
      }
      .dev {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        color: var(--color-text-muted);
        text-decoration: none;
        transition: color var(--dur);
      }
      .dev:hover {
        color: var(--color-accent);
      }
      .dev svg {
        flex-shrink: 0;
        opacity: 0.75;
      }
      .accent {
        height: 3px;
        width: 56px;
        border-radius: 2px;
        background: var(--grad-brand);
      }
      @media (max-width: 700px) {
        .inner {
          grid-template-columns: 1fr;
          gap: 28px;
        }
      }
    `,
  ],
})
export class FooterComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  path = this.ts.path.bind(this.ts);
  t = () => this.ts.t;
  year = new Date().getFullYear();
}
