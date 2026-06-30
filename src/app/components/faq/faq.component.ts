import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="section-padding">
      <div class="container narrow">
        <header class="head" appReveal>
          <span class="badge">FAQ</span>
          <h2>{{ t().faq.title }}</h2>
          <p class="sub">{{ t().faq.subtitle }}</p>
        </header>
        <div class="list">
          @for (item of t().faq.items; track item.q; let i = $index) {
            <div class="qa liquid-glass" [class.open]="open() === i" appReveal [revealDelay]="i < 4 ? i : 0">
              <button class="q" (click)="toggle(i)" [attr.aria-expanded]="open() === i">
                <span>{{ item.q }}</span>
                <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div class="a"><p>{{ item.a }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .narrow {
        max-width: 820px;
      }
      .head {
        text-align: center;
        margin-bottom: 40px;
      }
      h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin-top: 14px;
      }
      .sub {
        color: var(--color-text-muted);
        margin-top: 8px;
      }
      .list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .qa {
        border-radius: var(--r-md);
        overflow: hidden;
      }
      .q {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 22px;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.98rem;
        text-align: left;
        font-family: inherit;
      }
      .chev {
        width: 20px;
        height: 20px;
        flex: none;
        color: var(--color-accent);
        transition: transform var(--dur) var(--ease-glass);
      }
      .open .chev {
        transform: rotate(180deg);
      }
      .a {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--dur) var(--ease-glass);
      }
      .open .a {
        grid-template-rows: 1fr;
      }
      .a > p {
        overflow: hidden;
        color: var(--color-text-muted);
        line-height: 1.7;
        padding: 0 22px;
      }
      .open .a > p {
        padding: 0 22px 20px;
      }
    `,
  ],
})
export class FaqComponent {
  private ts = inject(TranslationService);
  t = () => this.ts.t;
  open = signal(-1);
  toggle(i: number) {
    this.open.update((v) => (v === i ? -1 : i));
  }
}
