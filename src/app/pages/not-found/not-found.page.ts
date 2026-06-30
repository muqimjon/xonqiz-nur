import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="nf">
      <div class="card liquid-glass lg-card">
        <span class="code grad-text">404</span>
        <p>Sahifa topilmadi</p>
        <div class="btns">
          <a class="btn-liquid" [routerLink]="['/', lang()]">{{ t().nav.home }}</a>
          <a class="btn-glass" [routerLink]="['/', lang(), 'katalog']">{{ t().nav.catalog }}</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .nf {
        min-height: 80vh;
        display: grid;
        place-items: center;
        padding: 140px 20px 60px;
      }
      .card {
        text-align: center;
        padding: 48px;
        max-width: 440px;
      }
      .code {
        font-size: clamp(4rem, 14vw, 7rem);
        font-weight: 900;
        line-height: 1;
      }
      p {
        color: var(--color-text-muted);
        margin: 8px 0 28px;
        font-size: 1.1rem;
      }
      .btns {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class NotFoundPage {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  t = () => this.ts.t;
}
