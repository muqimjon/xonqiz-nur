import { Component, inject, afterNextRender } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { MapComponent } from './components/map/map.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslationService } from './services/translation.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ProductsComponent,
    AboutComponent,
    MapComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="app-root">
      <app-navbar />
      <main>
        <app-hero />
        <div class="divider"></div>
        <app-products />
        <div class="divider"></div>
        <app-about />
        <div class="divider"></div>
        <app-map />
        <div class="divider"></div>
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .app-root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      main {
        flex: 1;
      }
    `,
  ],
})
export class App {
  private ts = inject(TranslationService);
  private theme = inject(ThemeService);

  constructor() {
    this.ts.init();
    this.theme.init();
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );
      document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    });
  }
}
