import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

type Gtag = (...args: unknown[]) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  init() {
    if (!this.isBrowser) return;
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const gtag = (window as unknown as { gtag?: Gtag }).gtag;
        gtag?.('event', 'page_view', {
          page_path: e.urlAfterRedirects,
          page_location: location.href,
          page_title: document.title,
        });
      }
    });
  }
}
