import { Component, ChangeDetectionStrategy, inject, signal, input, effect } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { InquiryService } from '../../services/inquiry.service';
import { WORLDS } from '../../shared/catalog.config';
import { RevealDirective } from '../../shared/reveal.directive';
import { RippleDirective } from '../../shared/ripple.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, RippleDirective],
  template: `
    <section class="section-padding" id="contact">
      <div class="container">
        <header class="head" appReveal>
          <span class="badge">{{ t().contact.title }}</span>
          <h2>{{ t().contact.subtitle }}</h2>
        </header>

        <div class="grid">
          <div class="cards" appReveal>
            <a class="card liquid-glass" href="tel:+998990600524">
              <span class="ic green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>
              </span>
              <span><small>{{ t().contact.phone }}</small><b>+998 99 060 05 24</b></span>
            </a>
            <a class="card liquid-glass" href="tel:+998935137890">
              <span class="ic green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>
              </span>
              <span><small>{{ t().contact.phone }}</small><b>+998 93 513 78 90</b></span>
            </a>
            <a class="card liquid-glass" href="https://t.me/xonqiznur" target="_blank" rel="noopener">
              <span class="ic blue">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.2 13 1.4 11.5c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.3 1.6Z"/></svg>
              </span>
              <span><small>{{ t().contact.telegram }}</small><b>&#64;xonqiznur</b></span>
            </a>
            <a class="card liquid-glass" href="mailto:raximov1990@umail.uz">
              <span class="ic amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              </span>
              <span><small>{{ t().contact.email }}</small><b>raximov1990&#64;umail.uz</b></span>
            </a>
            <div class="card liquid-glass full">
              <span class="ic violet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
              </span>
              <span><small>{{ t().contact.address }}</small><b>{{ t().contact.addressVal }}</b></span>
            </div>
          </div>

          <form class="form liquid-glass lg-card" appReveal [revealDelay]="1" (submit)="submit($event)">
            <h3>{{ t().contact.form.title }}</h3>
            <p class="form-sub">{{ t().contact.form.sub }}</p>

            <label>
              <span>{{ t().contact.form.name }}</span>
              <input type="text" [value]="name()" (input)="name.set($any($event.target).value)" [placeholder]="t().contact.form.namePh" required />
            </label>
            <label>
              <span>{{ t().contact.form.phone }}</span>
              <input type="tel" [value]="phone()" (input)="phone.set($any($event.target).value)" [placeholder]="t().contact.form.phonePh" required />
            </label>
            <label>
              <span>{{ t().contact.form.world }}</span>
              <select [value]="world()" (change)="world.set($any($event.target).value)">
                <option value="" disabled>{{ t().contact.form.worldPh }}</option>
                @for (w of worlds; track w.id) {
                  <option [value]="t().catalog.worlds[w.id].name">{{ t().catalog.worlds[w.id].name }}</option>
                }
              </select>
            </label>
            <label>
              <span>{{ t().contact.form.message }}</span>
              <textarea rows="3" [value]="message()" (input)="message.set($any($event.target).value)" [placeholder]="t().contact.form.messagePh"></textarea>
            </label>

            <button class="btn-liquid" type="submit" appRipple [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? t().contact.form.sending : t().contact.form.submit }}
            </button>

            @if (status() === 'ok') {
              <p class="msg ok">{{ t().contact.form.success }}</p>
            }
            @if (status() === 'err') {
              <p class="msg err">{{ t().contact.form.error }}</p>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .head {
        text-align: center;
        margin-bottom: 44px;
      }
      h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin-top: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px;
        align-items: start;
      }
      .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      .card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px;
        border-radius: var(--r-md);
        text-decoration: none;
      }
      .card.full {
        grid-column: span 2;
      }
      .card small {
        display: block;
        color: var(--color-text-muted);
        font-size: 0.74rem;
        margin-bottom: 2px;
      }
      .card b {
        color: var(--color-text);
        font-size: 0.92rem;
        font-weight: 700;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: var(--r-md);
        flex: none;
        transition: transform var(--dur) var(--ease-spring);
      }
      .ic svg {
        width: 22px;
        height: 22px;
      }
      .card:hover .ic {
        transform: scale(1.1) rotate(-5deg);
      }
      .green {
        color: #34d399;
        background: rgba(52, 211, 153, 0.12);
      }
      .blue {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.12);
      }
      .amber {
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.12);
      }
      .violet {
        color: var(--color-aux-violet);
        background: rgba(167, 139, 250, 0.12);
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .form h3 {
        font-size: 1.3rem;
        font-weight: 800;
      }
      .form-sub {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        margin-top: -6px;
        margin-bottom: 6px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      label span {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-text-muted);
      }
      input,
      select,
      textarea {
        width: 100%;
        padding: 12px 14px;
        border-radius: var(--r-md);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        color: var(--color-text);
        font-family: inherit;
        font-size: 0.92rem;
        transition: all var(--dur);
      }
      select option {
        background: var(--color-bg2);
        color: var(--color-text);
      }
      input:focus,
      select:focus,
      textarea:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px var(--color-glow);
      }
      textarea {
        resize: vertical;
      }
      .btn-liquid {
        margin-top: 6px;
        width: 100%;
      }
      .btn-liquid[disabled] {
        opacity: 0.7;
        cursor: default;
      }
      .msg {
        font-size: 0.88rem;
        font-weight: 600;
        padding: 10px 14px;
        border-radius: var(--r-md);
      }
      .msg.ok {
        color: #34d399;
        background: rgba(52, 211, 153, 0.1);
      }
      .msg.err {
        color: #f87171;
        background: rgba(248, 113, 113, 0.1);
      }
      @media (max-width: 860px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 460px) {
        .cards {
          grid-template-columns: 1fr;
        }
        .card.full {
          grid-column: span 1;
        }
      }
    `,
  ],
})
export class ContactComponent {
  private ts = inject(TranslationService);
  private inquiry = inject(InquiryService);
  t = () => this.ts.t;
  worlds = WORLDS;

  preselectWorld = input('');
  name = signal('');
  phone = signal('');
  world = signal('');
  message = signal('');
  status = signal<'idle' | 'sending' | 'ok' | 'err'>('idle');

  constructor() {
    effect(() => {
      const w = this.preselectWorld();
      if (w) this.world.set(w);
    });
  }

  async submit(e: Event) {
    e.preventDefault();
    if (!this.name() || !this.phone()) return;
    this.status.set('sending');
    const ok = await this.inquiry.send({
      name: this.name(),
      phone: this.phone(),
      world: this.world(),
      message: this.message(),
    });
    this.status.set(ok ? 'ok' : 'err');
    if (ok) {
      this.name.set('');
      this.phone.set('');
      this.message.set('');
    }
  }
}
