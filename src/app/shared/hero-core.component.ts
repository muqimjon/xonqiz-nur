import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TiltDirective } from './tilt.directive';

@Component({
  selector: 'xn-hero-core',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TiltDirective],
  template: `
    <div class="core" appTilt [tiltMax]="10">
      <div class="lens liquid-glass lg-refract"></div>
      <span class="orb orb-a"></span>
      <span class="orb orb-b"></span>
      <svg class="art" viewBox="0 0 200 200" aria-hidden="true">
        <g class="rings">
          <circle cx="100" cy="100" r="92" class="ring ring-a" />
          <circle cx="100" cy="100" r="70" class="ring ring-b" />
        </g>
        <path class="bolt-glow" d="M112 34 L72 106 H99 L90 166 L132 90 H105 L112 34 Z" />
        <path class="bolt" d="M112 34 L72 106 H99 L90 166 L132 90 H105 L112 34 Z" />
        <path class="charge" d="M112 34 L72 106 H99 L90 166 L132 90 H105 L112 34 Z" />
        <circle class="drop" cx="93" cy="150" r="7" />
        <circle class="drip" cx="93" cy="150" r="4.5" />
        <circle class="ripple-ring" cx="93" cy="178" r="5" />
      </svg>
      <span class="spark spark-1"></span>
      <span class="spark spark-2"></span>
      <span class="spark spark-3"></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(440px, 80vw);
        aspect-ratio: 1;
      }
      .core {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform var(--dur) var(--ease-glass);
        transform-style: preserve-3d;
      }
      .lens {
        position: absolute;
        inset: 8%;
        border-radius: 50%;
        background:
          radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.18), transparent 55%),
          var(--lg-tint);
      }
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(38px);
        opacity: 0.55;
        pointer-events: none;
      }
      .orb-a {
        inset: 12% auto auto 6%;
        width: 46%;
        height: 46%;
        background: var(--glow-amber);
        animation: float 9s ease-in-out infinite;
      }
      .orb-b {
        inset: auto 8% 10% auto;
        width: 42%;
        height: 42%;
        background: var(--glow-electric);
        animation: float 11s ease-in-out infinite reverse;
      }
      .art {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      .ring {
        fill: none;
        stroke: var(--color-border-strong);
        stroke-width: 0.6;
        stroke-dasharray: 2 8;
        transform-origin: 100px 100px;
      }
      .ring-a {
        animation: spin-slow 26s linear infinite;
      }
      .ring-b {
        stroke: rgba(245, 166, 35, 0.3);
        animation: spin-slow 18s linear infinite reverse;
      }
      .bolt {
        fill: url(#xn-grad-bolt);
      }
      .bolt-glow {
        fill: url(#xn-grad-bolt);
        filter: url(#xn-bolt-glow);
        animation: glow-pulse 2.6s ease-in-out infinite;
      }
      .charge {
        fill: none;
        stroke: #fff;
        stroke-width: 1.4;
        stroke-dasharray: 26 150;
        opacity: 0.9;
        animation: charge 3s linear infinite;
      }
      @keyframes charge {
        to {
          stroke-dashoffset: -176;
        }
      }
      .drop {
        fill: url(#xn-grad-water);
        filter: drop-shadow(0 0 6px var(--glow-electric));
      }
      .drip {
        fill: url(#xn-grad-water);
        transform-origin: center;
        animation: drip 3.4s ease-in infinite;
      }
      .ripple-ring {
        fill: none;
        stroke: var(--color-electric);
        stroke-width: 1.4;
        opacity: 0;
        transform-origin: 93px 178px;
        animation: coreripple 3.4s ease-out infinite;
      }
      @keyframes coreripple {
        0%,
        70% {
          transform: scale(0.3);
          opacity: 0;
        }
        78% {
          opacity: 0.7;
        }
        100% {
          transform: scale(2.6);
          opacity: 0;
        }
      }
      .spark {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-accent-hi);
        box-shadow: 0 0 12px var(--glow-amber);
      }
      .spark-1 {
        top: 14%;
        left: 50%;
        animation: float 6s ease-in-out infinite;
      }
      .spark-2 {
        top: 60%;
        left: 12%;
        background: var(--color-electric-hi);
        box-shadow: 0 0 12px var(--glow-electric);
        animation: float 7.5s ease-in-out infinite reverse;
      }
      .spark-3 {
        top: 76%;
        right: 18%;
        animation: float 5.5s ease-in-out infinite;
      }
    `,
  ],
})
export class HeroCoreComponent {}
