import { Component, ChangeDetectionStrategy, inject, input, computed, effect } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import { worldBySlug } from '../../shared/catalog.config';
import { WorldIconComponent } from '../../shared/world-icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { RippleDirective } from '../../shared/ripple.directive';

@Component({
  selector: 'app-category',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, WorldIconComponent, RevealDirective, TiltDirective, RippleDirective],
  template: `
    @if (meta(); as m) {
      <section class="section-padding page-top" [attr.data-accent]="m.accent">
        <div class="container">
          <a class="back" [routerLink]="['/', lang(), 'katalog']">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            {{ t().catalog.backToCatalog }}
          </a>
          <header class="head" appReveal>
            <span class="hicon"><app-world-icon [world]="m.id" [size]="40" /></span>
            <div>
              <h1>{{ data().name }}</h1>
              <p class="sub">{{ data().blurb }}</p>
            </div>
            <a class="btn-liquid ask" [routerLink]="['/', lang(), 'aloqa']" [queryParams]="{ yonalish: data().name }">
              {{ t().catalog.askCta }}
            </a>
          </header>

          <div class="items">
            @for (it of data().items; track it.name; let i = $index) {
              <article class="item liquid-glass" appReveal [revealDelay]="i < 8 ? i : 0" appTilt [tiltMax]="4" appRipple>
                <span class="i-ic"><app-world-icon [world]="m.id" [size]="20" /></span>
                <div>
                  <h3>{{ it.name }}</h3>
                  <p>{{ it.descriptor }}</p>
                </div>
              </article>
            }
          </div>

          <div class="cta-band liquid-glass" appReveal>
            <span class="cta-text">{{ t().catalog.askCta }} — {{ data().name }}</span>
            <div class="cta-btns">
              <a class="btn-glass" href="tel:+998990600524">+998 99 060 05 24</a>
              <a class="btn-liquid" href="https://t.me/xonqiznur" target="_blank" rel="noopener">Telegram</a>
            </div>
          </div>
        </div>
      </section>
    }
  `,
  styles: [
    `
      .page-top {
        padding-top: 130px;
      }
      .back {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--color-text-muted);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.88rem;
        margin-bottom: 24px;
      }
      .back:hover {
        color: var(--color-accent);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }
      .hicon {
        display: grid;
        place-items: center;
        width: 72px;
        height: 72px;
        border-radius: var(--r-lg);
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.1);
        flex: none;
      }
      [data-accent='electric'] .hicon {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.1);
      }
      [data-accent='glow'] .hicon {
        color: var(--color-accent-hi);
        background: rgba(255, 209, 102, 0.14);
        box-shadow: 0 0 30px rgba(255, 209, 102, 0.25);
      }
      .head h1 {
        font-size: var(--fs-h1);
        font-weight: 900;
        letter-spacing: -0.03em;
      }
      .head .sub {
        color: var(--color-text-muted);
        margin-top: 4px;
      }
      .head > div {
        flex: 1;
        min-width: 200px;
      }
      .ask {
        flex: none;
      }
      .items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      .item {
        display: flex;
        gap: 14px;
        padding: 18px 20px;
        border-radius: var(--r-md);
        align-items: flex-start;
      }
      .i-ic {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: var(--r-sm);
        flex: none;
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.1);
      }
      [data-accent='electric'] .i-ic {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.1);
      }
      [data-accent='glow'] .i-ic {
        color: var(--color-accent-hi);
        background: rgba(255, 209, 102, 0.12);
      }
      .item h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 4px;
      }
      .item p {
        color: var(--color-text-muted);
        font-size: 0.86rem;
        line-height: 1.5;
      }
      .cta-band {
        margin-top: 36px;
        padding: 26px 30px;
        border-radius: var(--r-lg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        flex-wrap: wrap;
      }
      .cta-text {
        font-weight: 700;
        font-size: 1.05rem;
      }
      .cta-btns {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
      @media (max-width: 640px) {
        .items {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CategoryPage {
  private ts = inject(TranslationService);
  private seo = inject(SeoService);
  private router = inject(Router);
  lang = this.ts.lang;
  t = () => this.ts.t;

  world = input('');
  meta = computed(() => worldBySlug(this.world()));
  data = computed(() => {
    const m = this.meta();
    return m ? this.ts.t.catalog.worlds[m.id] : { name: '', blurb: '', items: [] };
  });

  constructor() {
    effect(() => {
      const m = this.meta();
      if (this.world() && !m) {
        this.router.navigate(['/', this.lang(), 'katalog']);
      } else if (m) {
        this.seo.apply(m.id);
      }
    });
  }
}
