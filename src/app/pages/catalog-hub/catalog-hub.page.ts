import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import { WorldsBentoComponent } from '../../components/worlds-bento/worlds-bento.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-catalog-hub',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WorldsBentoComponent, RevealDirective],
  template: `
    <section class="section-padding page-top">
      <div class="container">
        <header class="head" appReveal>
          <span class="badge">{{ t().nav.catalog }}</span>
          <h1>{{ t().catalog.title }}</h1>
          <p class="sub">{{ t().catalog.subtitle }}</p>
        </header>
        <app-worlds-bento />
        <p class="notfound" appReveal>
          {{ t().catalog.notFound }}
          <a href="https://t.me/xonqiznur" target="_blank" rel="noopener">&#64;xonqiznur</a>
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .page-top {
        padding-top: 140px;
      }
      .head {
        text-align: center;
        margin-bottom: 44px;
      }
      h1 {
        font-size: var(--fs-h1);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin: 14px 0 8px;
      }
      .sub {
        color: var(--color-text-muted);
        font-size: 1.05rem;
      }
      .notfound {
        text-align: center;
        margin-top: 36px;
        color: var(--color-text-muted);
      }
      .notfound a {
        color: var(--color-accent);
        font-weight: 700;
        text-decoration: none;
      }
    `,
  ],
})
export class CatalogHubPage {
  private ts = inject(TranslationService);
  private seo = inject(SeoService);
  t = () => this.ts.t;
  constructor() {
    effect(() => this.seo.apply('catalog'));
  }
}
