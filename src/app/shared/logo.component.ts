import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="11"
        fill="rgba(245,166,35,0.08)"
        stroke="var(--color-glass-border)"
      />
      <path d="M22.5 6 L11 22.5 H19 L17 34 L29.5 16.5 H21 L22.5 6 Z" fill="url(#xn-grad-bolt)" />
      <circle cx="13" cy="30" r="3" fill="url(#xn-grad-water)" />
    </svg>
  `,
})
export class LogoComponent {
  size = input(36);
}
