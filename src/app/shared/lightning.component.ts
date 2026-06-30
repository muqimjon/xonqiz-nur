import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  afterNextRender,
  signal,
  viewChild,
  input,
  DestroyRef,
} from '@angular/core';
import { MotionService } from './motion.service';

@Component({
  selector: 'xn-lightning',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="glow" [attr.d]="d()" />
      <path class="bolt" [attr.d]="d()" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      svg {
        width: 100%;
        height: 100%;
        opacity: 0;
        overflow: visible;
      }
      .bolt {
        fill: none;
        stroke: var(--bolt-color, var(--color-accent-hi));
        stroke-width: 1.4;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      .glow {
        fill: none;
        stroke: var(--bolt-color, var(--color-accent-hi));
        stroke-width: 4;
        opacity: 0.5;
        filter: blur(3px);
      }
    `,
  ],
  host: {
    '[style.--bolt-color]': "color() === 'electric' ? 'var(--color-electric-hi)' : 'var(--color-accent-hi)'",
  },
})
export class LightningComponent {
  color = input<'amber' | 'electric'>('amber');
  d = signal('M 50 0 L 50 100');
  private svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');
  private motion = inject(MotionService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!this.motion.heavy) return;
      let timer: ReturnType<typeof setTimeout>;
      const strike = () => {
        this.d.set(this.generate());
        this.svg().nativeElement.animate(
          [
            { opacity: 0 },
            { opacity: 1, offset: 0.08 },
            { opacity: 0.85, offset: 0.5 },
            { opacity: 0 },
          ],
          { duration: 620, easing: 'ease-out' },
        );
        timer = setTimeout(strike, 2400 + Math.random() * 2600);
      };
      timer = setTimeout(strike, 600 + Math.random() * 1200);
      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }

  private generate(): string {
    let pts = [
      { x: 50 + (Math.random() * 26 - 13), y: 0 },
      { x: 50 + (Math.random() * 26 - 13), y: 100 },
    ];
    let displace = 24;
    for (let it = 0; it < 4; it++) {
      const next: { x: number; y: number }[] = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        next.push(a, { x: (a.x + b.x) / 2 + (Math.random() * 2 - 1) * displace, y: (a.y + b.y) / 2 });
      }
      next.push(pts[pts.length - 1]);
      pts = next;
      displace *= 0.6;
    }
    return 'M ' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ');
  }
}
