import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Inquiry {
  name: string;
  phone: string;
  world: string;
  message: string;
}

const RELAY_URL = '/api/lead';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  async send(data: Inquiry): Promise<boolean> {
    if (!this.isBrowser) return false;
    try {
      const res = await fetch(RELAY_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
