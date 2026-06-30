import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-floating-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MagneticDirective],
  template: `
    <div class="fab">
      <a class="b tg" href="https://t.me/xonqiznur" target="_blank" rel="noopener" [attr.aria-label]="t().floating.telegram" appMagnetic>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.2 13 1.4 11.5c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.3 1.6Z"/></svg>
      </a>
      <a class="b call" href="tel:+998990600524" [attr.aria-label]="t().floating.call" appMagnetic>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
          <path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      </a>
    </div>
  `,
  styles: [
    `
      .fab {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 90;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .b {
        display: grid;
        place-items: center;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        color: #fff;
        box-shadow: var(--shadow-2);
        transition: transform var(--dur) var(--ease-spring);
        animation: pulse-ring 3s ease-in-out infinite;
      }
      .b svg {
        width: 26px;
        height: 26px;
      }
      .b:hover {
        transform: scale(1.08);
      }
      .tg {
        background: linear-gradient(135deg, #2aabee, #229ed9);
        animation-delay: 0.5s;
      }
      .call {
        background: linear-gradient(135deg, #34d399, #10b981);
      }
      @media (max-width: 560px) {
        .b {
          width: 48px;
          height: 48px;
        }
        .b svg {
          width: 22px;
          height: 22px;
        }
      }
    `,
  ],
})
export class FloatingContactComponent {
  private ts = inject(TranslationService);
  t = () => this.ts.t;
}
