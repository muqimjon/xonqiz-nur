import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  afterNextRender,
  viewChild,
  DestroyRef,
} from '@angular/core';
import { MotionService } from './motion.service';

interface Bead {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
}

@Component({
  selector: 'xn-water-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #cv aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0.5;
      }
    `,
  ],
})
export class WaterCanvasComponent {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private motion = inject(MotionService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!this.motion.heavy) return;
      const canvas = this.canvasRef().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(devicePixelRatio || 1, 2);
      let w = 0;
      let h = 0;
      let beads: Bead[] = [];

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.width = Math.max(1, w * dpr);
        canvas.height = Math.max(1, h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(36, Math.round((w * h) / 14000));
        beads = Array.from({ length: count }, () => this.makeBead(w, h));
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (const b of beads) {
          b.y += b.vy;
          b.x += Math.sin(b.y * 0.02) * b.drift;
          if (b.y - b.r > h) Object.assign(b, this.makeBead(w, -10));
          const g = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
          g.addColorStop(0, 'rgba(255,255,255,0.5)');
          g.addColorStop(0.4, 'rgba(155,227,255,0.25)');
          g.addColorStop(1, 'rgba(79,195,247,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      let raf = 0;
      let running = false;
      const loop = () => {
        draw();
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? start() : stop())),
        { threshold: 0 },
      );
      io.observe(canvas);

      const onVis = () => (document.hidden ? stop() : start());
      document.addEventListener('visibilitychange', onVis);

      this.destroyRef.onDestroy(() => {
        stop();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
      });
    });
  }

  private makeBead(w: number, y: number): Bead {
    const r = 2 + Math.random() * 6;
    return {
      x: Math.random() * Math.max(1, w),
      y,
      r,
      vy: 0.08 + r * 0.03,
      drift: 0.12 + r * 0.02,
    };
  }
}
