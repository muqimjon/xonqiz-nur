import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { WORLDS, WorldId } from '../../shared/catalog.config';
import { WorldIconComponent } from '../../shared/world-icon.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { RippleDirective } from '../../shared/ripple.directive';

@Component({
  selector: 'app-worlds-bento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, WorldIconComponent, RevealDirective, TiltDirective, RippleDirective],
  template: `
    <div class="bento" [style.--feat-span]="featureSpan">
      @for (w of worlds; track w.id; let i = $index) {
        <a
          class="cell liquid-glass lg-card"
          [class.feature]="w.id === 'dizayn'"
          [attr.data-accent]="w.accent"
          [routerLink]="['/', lang(), 'katalog', w.slug]"
          appReveal
          [revealDelay]="i"
          appTilt
          [tiltMax]="5"
          appRipple
        >
          <span class="ic"><app-world-icon [world]="w.id" [size]="32" /></span>
          <div class="body">
            <h3>{{ world(w.id).name }}</h3>
            <p>{{ world(w.id).blurb }}</p>
          </div>
          <div class="meta">
            <span class="count">{{ world(w.id).items.length }} {{ t().catalog.itemsLabel }}</span>
            <span class="go">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </a>
      }
    </div>
  `,
  styles: [
    `
      .bento {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 18px;
      }
      .cell {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 14px;
        text-decoration: none;
        min-height: 200px;
        overflow: hidden;
      }
      .cell.feature {
        grid-column: span var(--feat-span, 4);
        background:
          radial-gradient(circle at 80% 20%, rgba(255, 209, 102, 0.16), transparent 55%),
          var(--lg-tint);
      }
      .ic {
        display: grid;
        place-items: center;
        width: 56px;
        height: 56px;
        border-radius: var(--r-md);
        color: var(--color-accent);
        background: rgba(245, 166, 35, 0.1);
        transition: transform var(--dur) var(--ease-spring);
      }
      .cell[data-accent='electric'] .ic {
        color: var(--color-electric);
        background: rgba(79, 195, 247, 0.1);
      }
      .cell[data-accent='glow'] .ic {
        color: var(--color-accent-hi);
        background: rgba(255, 209, 102, 0.14);
        box-shadow: 0 0 30px rgba(255, 209, 102, 0.25);
      }
      .cell:hover .ic {
        transform: scale(1.08) rotate(-4deg);
      }
      .body {
        flex: 1;
      }
      h3 {
        font-size: 1.2rem;
        font-weight: 800;
        margin-bottom: 6px;
      }
      .feature h3 {
        font-size: 1.5rem;
      }
      p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        line-height: 1.55;
        max-width: 46ch;
      }
      .meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .count {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--color-text-faint);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .go {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--color-surface);
        color: var(--color-accent);
        transition: all var(--dur) var(--ease-spring);
      }
      .go svg {
        width: 16px;
        height: 16px;
      }
      .cell:hover .go {
        background: var(--grad-brand);
        color: #07070c;
        transform: translateX(3px);
      }
      @media (max-width: 900px) {
        .bento {
          grid-template-columns: repeat(2, 1fr);
        }
        .cell,
        .cell.feature {
          grid-column: span 1;
        }
        .cell.feature {
          grid-column: span 2;
        }
      }
      @media (max-width: 560px) {
        .bento {
          grid-template-columns: 1fr;
        }
        .cell,
        .cell.feature {
          grid-column: span 1;
        }
      }
    `,
  ],
})
export class WorldsBentoComponent {
  private ts = inject(TranslationService);
  lang = this.ts.lang;
  t = () => this.ts.t;
  worlds = WORLDS;
  featureSpan = ((WORLDS.length - 1) * 2) % 6 === 0 ? 6 : 6 - (((WORLDS.length - 1) * 2) % 6);
  world = (id: WorldId) => this.ts.t.catalog.worlds[id];
}
