import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { WorldId } from './catalog.config';

@Component({
  selector: 'app-world-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (world()) {
        @case ('elektr') {
          <path d="M13 2 L4 14 H11 L9 22 L20 9 H13 L13 2 Z" />
        }
        @case ('santexnika') {
          <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 a6.5 6.5 0 0 0 13 0 C18.5 10 12 2.5 12 2.5 Z" />
          <path d="M9.5 15 a2.5 2.5 0 0 0 2.5 2.5" />
        }
        @case ('qurilish') {
          <path d="M3 9 h18 v3 H3 Z" />
          <path d="M3 15 h18 v3 H3 Z" />
          <path d="M8 9 V12 M14 9 V12 M6 15 V18 M12 15 V18 M18 15 V18" />
        }
        @case ('asboblar') {
          <path
            d="M15.5 4.5 a4 4 0 0 0-5 5 L4 16 l4 4 6.5-6.5 a4 4 0 0 0 5-5 L17 7 l-2 2-2-2 2-2 Z"
          />
        }
        @case ('dizayn') {
          <path d="M12 3 V5" />
          <path d="M6.5 12 C6.5 8.5 9 6 12 6 s5.5 2.5 5.5 6 Z" />
          <path d="M9.5 12 v1.5 a2.5 2.5 0 0 0 5 0 V12" />
          <path d="M12 16 v3 M10.5 21 h3" />
        }
      }
    </svg>
  `,
})
export class WorldIconComponent {
  world = input.required<WorldId>();
  size = input(28);
}
