import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslationService, Lang } from './translation.service';
import { WorldId } from '../shared/catalog.config';

export type SeoKey = 'home' | 'catalog' | WorldId | 'about' | 'contact';

const DOMAIN = 'https://xonqiz.uz';
const OG_LOCALE: Record<Lang, string> = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' };
const LANGS: Lang[] = ['uz', 'ru', 'en'];

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private ts = inject(TranslationService);
  private router = inject(Router);

  apply(key: SeoKey) {
    const e = this.ts.t.seo[key];
    const lang = this.ts.lang();
    const rest = this.restPath();
    const canonical = `${DOMAIN}${this.base(lang)}${rest}`;
    const ogImage = `${DOMAIN}/og-image.jpg`;

    this.title.setTitle(e.title);
    this.meta.updateTag({ name: 'description', content: e.description });
    this.meta.updateTag({ property: 'og:title', content: e.title });
    this.meta.updateTag({ property: 'og:description', content: e.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Xonqiz Nur' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: e.title });
    this.meta.updateTag({ name: 'twitter:description', content: e.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    this.doc.documentElement.lang = lang;
    this.setLink('canonical', canonical);
    LANGS.forEach((l) => this.setAlternate(l, `${DOMAIN}${this.base(l)}${rest}`));
    this.setAlternate('x-default', `${DOMAIN}${rest}`);
  }

  private base(l: Lang): string {
    return l === 'uz' ? '' : `/${l}`;
  }

  private restPath(): string {
    const segs = this.router.url.split('?')[0].split('#')[0].split('/').filter(Boolean);
    if (segs[0] === 'ru' || segs[0] === 'en') segs.shift();
    return segs.length ? `/${segs.join('/')}` : '';
  }

  private setLink(rel: string, href: string) {
    const head = this.doc.head;
    let el = head.querySelector(`link[rel="${rel}"]:not([hreflang])`) as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', rel);
      head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  private setAlternate(hreflang: string, href: string) {
    const head = this.doc.head;
    let el = head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', hreflang);
      head.appendChild(el);
    }
    el.setAttribute('href', href);
  }
}
