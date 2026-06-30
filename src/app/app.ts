import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterDefsComponent } from './shared/filter-defs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingContactComponent } from './components/floating-contact/floating-contact.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, FilterDefsComponent, NavbarComponent, FooterComponent, FloatingContactComponent],
  template: `
    <app-filter-defs />
    <app-navbar />
    <main><router-outlet /></main>
    <app-floating-contact />
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      main {
        flex: 1;
      }
    `,
  ],
})
export class App {
  private theme = inject(ThemeService);
  constructor() {
    this.theme.init();
  }
}
