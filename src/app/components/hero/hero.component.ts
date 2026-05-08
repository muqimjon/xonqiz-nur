import { Component, inject, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero-section">
      <!-- Animated background -->
      <div class="hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>

      <div class="hero-content">
        <!-- Badge -->
        <div class="badge fade-up visible" style="--delay:0s">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="5"/>
          </svg>
          {{ ts.t.hero.badge }}
        </div>

        <!-- Main heading -->
        <h1 class="hero-title fade-up visible" style="--delay:0.1s">
          <span class="title-line">{{ ts.t.hero.title1 }}</span>
          <span class="title-line accent-line">{{ ts.t.hero.title2 }}</span>
          <span class="title-line">{{ ts.t.hero.title3 }}</span>
        </h1>

        <!-- Description -->
        <p class="hero-desc fade-up visible" style="--delay:0.2s">{{ ts.t.hero.desc }}</p>

        <!-- CTA Buttons -->
        <div class="hero-actions fade-up visible" style="--delay:0.3s">
          <a href="#contact" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {{ ts.t.hero.cta }}
          </a>
          <a href="#location" class="btn-glass">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {{ ts.t.hero.ctaSecondary }}
          </a>
        </div>

        <!-- Stats -->
        <div class="hero-stats fade-up visible" style="--delay:0.4s">
          <div class="stat-item">
            <span class="stat-num">{{ ts.t.hero.stat1 }}</span>
            <span class="stat-label">{{ ts.t.hero.stat1label }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ ts.t.hero.stat2 }}</span>
            <span class="stat-label">{{ ts.t.hero.stat2label }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ ts.t.hero.stat3 }}</span>
            <span class="stat-label">{{ ts.t.hero.stat3label }}</span>
          </div>
        </div>
      </div>

      <!-- Floating visual element -->
      <div class="hero-visual float-anim">
        <div class="visual-ring ring-outer spin-slow"></div>
        <div class="visual-ring ring-inner"></div>
        <div class="visual-core pulse-glow-anim">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <!-- Large bolt -->
            <path d="M42 8L18 42H34L30 64L54 30H38L42 8Z" fill="url(#boltGrad)" stroke="rgba(245,166,35,0.3)" stroke-width="1"/>
            <!-- Water drop -->
            <path d="M18 54 C18 54 12 48 12 44 C12 40.7 14.7 38 18 38 C21.3 38 24 40.7 24 44 C24 48 18 54 18 54Z" fill="url(#dropGrad)" opacity="0.9"/>
            <defs>
              <linearGradient id="boltGrad" x1="18" y1="8" x2="54" y2="64">
                <stop offset="0%" stop-color="#ffd166"/>
                <stop offset="100%" stop-color="#f5a623"/>
              </linearGradient>
              <linearGradient id="dropGrad" x1="12" y1="38" x2="24" y2="54">
                <stop offset="0%" stop-color="#7dd3fc"/>
                <stop offset="100%" stop-color="#4fc3f7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <!-- Orbiting dots -->
        <div class="orbit-dot dot-1"></div>
        <div class="orbit-dot dot-2"></div>
        <div class="orbit-dot dot-3"></div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh; position: relative;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; padding: 120px 24px 80px;
    }

    /* Background */
    .hero-bg { position: absolute; inset: 0; pointer-events: none; }
    .orb {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none;
    }
    .orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%);
      top: -100px; left: -100px; animation: float 9s ease-in-out infinite;
    }
    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 70%);
      bottom: 0; right: -50px; animation: float 11s ease-in-out infinite reverse;
    }
    .orb-3 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%);
      top: 40%; left: 50%; animation: float 7s ease-in-out infinite 2s;
    }
    .grid-overlay {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(var(--color-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%);
      opacity: 0.4;
    }

    /* Content */
    .hero-content {
      position: relative; z-index: 2;
      max-width: 640px; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 28px;
    }

    .hero-title {
      font-size: clamp(2.8rem, 7vw, 5.5rem);
      font-weight: 900; line-height: 1.05;
      letter-spacing: -0.03em;
      display: flex; flex-direction: column; gap: 0;
    }
    .title-line { display: block; }
    .accent-line {
      color: var(--color-accent);
      text-shadow: 0 0 60px rgba(245,166,35,0.3);
    }

    .hero-desc {
      font-size: 1.05rem; line-height: 1.7;
      color: var(--color-text-muted); max-width: 520px;
    }

    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

    /* Stats */
    .hero-stats {
      display: flex; align-items: center; gap: 0;
      background: var(--color-glass); backdrop-filter: blur(20px);
      border: 1px solid var(--color-glass-border); border-radius: 18px;
      padding: 20px 32px; gap: 0;
    }
    .stat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 24px; }
    .stat-num { font-size: 1.6rem; font-weight: 900; color: var(--color-accent); }
    .stat-label { font-size: 0.75rem; color: var(--color-text-muted); font-weight: 500; white-space: nowrap; }
    .stat-divider { width: 1px; height: 40px; background: var(--color-border); }

    /* Visual */
    .hero-visual {
      position: absolute; right: 5%; top: 50%; transform: translateY(-50%);
      width: 280px; height: 280px; display: flex; align-items: center; justify-content: center;
    }
    .visual-ring {
      position: absolute; border-radius: 50%; border: 1px solid;
    }
    .ring-outer {
      width: 260px; height: 260px;
      border-color: rgba(245,166,35,0.12);
    }
    .ring-inner {
      width: 200px; height: 200px;
      border-color: rgba(245,166,35,0.18);
      border-style: dashed;
    }
    .visual-core {
      width: 120px; height: 120px; border-radius: 28px;
      background: var(--color-glass); backdrop-filter: blur(20px);
      border: 1px solid rgba(245,166,35,0.2);
      display: flex; align-items: center; justify-content: center;
      position: relative; z-index: 2;
    }

    .orbit-dot {
      position: absolute; width: 10px; height: 10px;
      border-radius: 50%; background: var(--color-accent);
    }
    .dot-1 { top: 10px; left: 50%; transform: translateX(-50%); opacity: 0.8; }
    .dot-2 { bottom: 20px; right: 18px; width: 7px; height: 7px; background: var(--color-electric); opacity: 0.7; }
    .dot-3 { bottom: 30px; left: 22px; width: 6px; height: 6px; opacity: 0.5; }

    /* Scroll indicator */
    .scroll-indicator {
      position: absolute; bottom: 32px; left: 50%;
      transform: translateX(-50%); display: flex; flex-direction: column; align-items: center;
    }
    .scroll-line {
      width: 1px; height: 48px;
      background: linear-gradient(to bottom, var(--color-accent), transparent);
      animation: scroll-pulse 2s ease-in-out infinite;
    }
    @keyframes scroll-pulse { 0%,100%{opacity:0.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.1)} }

    @media (max-width: 1024px) { .hero-visual { display: none; } }
    @media (max-width: 600px) {
      .hero-stats { padding: 16px 20px; }
      .stat-item { padding: 0 14px; }
      .stat-num { font-size: 1.3rem; }
    }
  `]
})
export class HeroComponent {
  ts = inject(TranslationService);
}
