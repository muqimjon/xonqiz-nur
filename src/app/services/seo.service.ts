import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslationService } from './translation.service';
import { WorldId } from '../shared/catalog.config';

export type SeoKey = 'home' | 'catalog' | WorldId | 'about' | 'contact';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private ts = inject(TranslationService);

  apply(key: SeoKey) {
    const e = this.ts.t.seo[key];
    const lang = this.ts.lang();
    this.title.setTitle(e.title);
    this.meta.updateTag({ name: 'description', content: e.description });
    this.meta.updateTag({ property: 'og:title', content: e.title });
    this.meta.updateTag({ property: 'og:description', content: e.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.doc.documentElement.lang = lang;
  }
}
