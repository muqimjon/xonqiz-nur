import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filter-defs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="xn-filter-defs" aria-hidden="true" focusable="false" width="0" height="0">
      <defs>
        <linearGradient id="xn-grad-bolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffd166" />
          <stop offset="1" stop-color="#e8931a" />
        </linearGradient>
        <linearGradient id="xn-grad-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#9be3ff" />
          <stop offset="1" stop-color="#0ea5e9" />
        </linearGradient>
        <filter id="xn-glass" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.1" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="xn-glass-lens" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.01" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="xn-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
          <feColorMatrix
            in="b"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <filter id="xn-bolt-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="g" />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  `,
  styles: [
    `
      .xn-filter-defs {
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
        pointer-events: none;
      }
    `,
  ],
})
export class FilterDefsComponent {}
