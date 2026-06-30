import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Inquiry {
  name: string;
  phone: string;
  world: string;
  message: string;
}

const RELAY_URL = '';

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  async send(data: Inquiry): Promise<boolean> {
    if (!this.isBrowser) return false;
    if (RELAY_URL) {
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
    const body = `Ism: ${data.name}\nTel: ${data.phone}\nYo'nalish: ${data.world}\n\n${data.message}`;
    window.location.href = `mailto:raximov1990@umail.uz?subject=${encodeURIComponent(
      'Xonqiz Nur — soʻrov',
    )}&body=${encodeURIComponent(body)}`;
    return true;
  }
}
