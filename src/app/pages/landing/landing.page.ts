import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { TrustStripComponent } from '../../components/trust-strip/trust-strip.component';
import { WorldsBentoComponent } from '../../components/worlds-bento/worlds-bento.component';
import { SpotlightComponent } from '../../components/spotlight/spotlight.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { AboutComponent } from '../../components/about/about.component';
import { MapComponent } from '../../components/map/map.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    TrustStripComponent,
    WorldsBentoComponent,
    SpotlightComponent,
    WhyUsComponent,
    StatsComponent,
    AboutComponent,
    MapComponent,
    ContactComponent,
    RevealDirective,
  ],
  template: `
    <app-hero />
    <app-trust-strip />
    <section class="section-padding">
      <div class="container">
        <header class="head" appReveal>
          <span class="badge">{{ t().catalog.title }}</span>
          <h2>{{ t().catalog.subtitle }}</h2>
        </header>
        <app-worlds-bento />
      </div>
    </section>
    <div class="divider"></div>
    <app-spotlight />
    <app-why-us />
    <app-stats />
    <app-about />
    <app-map />
    <app-contact />
  `,
  styles: [
    `
      .head {
        text-align: center;
        margin-bottom: 44px;
      }
      .head h2 {
        font-size: var(--fs-h2);
        font-weight: 900;
        letter-spacing: -0.03em;
        margin-top: 14px;
      }
    `,
  ],
})
export class LandingPage {
  private ts = inject(TranslationService);
  private seo = inject(SeoService);
  t = () => this.ts.t;
  constructor() {
    effect(() => this.seo.apply('home'));
  }
}
