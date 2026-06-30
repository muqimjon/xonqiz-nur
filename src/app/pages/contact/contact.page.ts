import { Component, ChangeDetectionStrategy, inject, input, effect } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ContactComponent } from '../../components/contact/contact.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactComponent, MapComponent],
  template: `
    <app-contact [preselectWorld]="yonalish()" />
    <app-map />
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
export class ContactPage {
  private seo = inject(SeoService);
  yonalish = input('');
  constructor() {
    effect(() => this.seo.apply('contact'));
  }
}
