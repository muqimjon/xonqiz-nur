import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AboutComponent } from '../../components/about/about.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AboutComponent, StatsComponent, FaqComponent],
  template: `
    <app-about [showCta]="false" />
    <app-stats />
    <app-faq />
  `,
  styles: [
    `
      :host {
        display: block;
        padding-top: 64px;
      }
    `,
  ],
})
export class AboutPage {
  private seo = inject(SeoService);
  constructor() {
    effect(() => this.seo.apply('about'));
  }
}
