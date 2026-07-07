import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { siteConfig } from '../site-config';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <header
      id="home"
      class="hero d-flex align-items-center justify-content-center text-center"
      [class.hero--image]="!!cfg.heroImage"
      [style.background-image]="cfg.heroImage ? 'url(' + cfg.heroImage + ')' : null"
    >
      <div class="hero-inner container">
        <p class="hero-eyebrow">{{ cfg.invitationLine }}</p>

        <h1 class="hero-names">
          <span>{{ cfg.partnerOne }}</span>
          <span class="hero-amp">&amp;</span>
          <span>{{ cfg.partnerTwo }}</span>
        </h1>

        <div class="hero-meta">
          <span>{{ cfg.displayDate }}</span>
          <span class="hero-dot">•</span>
          <span>{{ cfg.location }}</span>
        </div>

        <!-- Countdown -->
        @if (!countdown().passed) {
          <div class="countdown" aria-label="Contagem regressiva para o casamento">
            <div class="count-box">
              <span class="count-num">{{ countdown().days }}</span>
              <span class="count-label">Dias</span>
            </div>
            <div class="count-box">
              <span class="count-num">{{ pad(countdown().hours) }}</span>
              <span class="count-label">Horas</span>
            </div>
            <div class="count-box">
              <span class="count-num">{{ pad(countdown().minutes) }}</span>
              <span class="count-label">Minutos</span>
            </div>
            <div class="count-box">
              <span class="count-num">{{ pad(countdown().seconds) }}</span>
              <span class="count-label">Segundos</span>
            </div>
          </div>
        } @else {
          <p class="just-married">Nós nos casamos! Obrigado por celebrar conosco. 💍</p>
        }

        <a href="#rsvp" class="btn btn-wedding mt-4">Confirmar Presença</a>
      </div>

      <a href="#story" class="scroll-cue" aria-label="Rolar para baixo">
        <i class="bi bi-chevron-down"></i>
      </a>
    </header>
  `,
  styles: [
    `
      .hero {
        position: relative;
        min-height: 100vh;
        min-height: 100svh;
        color: #fff;
        background-color: var(--sage-dark);
        background-image:
          radial-gradient(1200px 600px at 70% -10%, rgba(189, 154, 95, 0.45), transparent 60%),
          linear-gradient(160deg, #6c7a5b 0%, #5e6d4f 45%, #47543b 100%);
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }
      .hero--image {
        background-color: #444;
      }
      .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(30, 36, 24, 0.35), rgba(30, 36, 24, 0.55));
        z-index: 1;
      }
      .hero-inner {
        position: relative;
        z-index: 2;
        padding: 6rem 1rem 4rem;
      }
      .hero-eyebrow {
        font-family: var(--font-body);
        text-transform: uppercase;
        letter-spacing: 0.28em;
        font-size: clamp(0.65rem, 1.6vw, 0.8rem);
        font-weight: 400;
        margin-bottom: 1.25rem;
        color: rgba(255, 255, 255, 0.88);
      }
      .hero-names {
        font-family: var(--font-script);
        font-weight: 400;
        color: #fff;
        line-height: 1.05;
        font-size: clamp(3.5rem, 13vw, 8rem);
        margin-bottom: 1rem;
        text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25);
      }
      .hero-names .hero-amp {
        display: inline-block;
        margin: 0 0.3em;
        color: var(--gold);
      }
      .hero-meta {
        font-family: var(--font-display);
        font-size: clamp(1rem, 2.4vw, 1.4rem);
        letter-spacing: 0.04em;
        margin-bottom: 2.5rem;
      }
      .hero-dot {
        margin: 0 0.75rem;
        color: var(--gold);
      }
      .countdown {
        display: flex;
        justify-content: center;
        gap: clamp(0.75rem, 3vw, 2.25rem);
        flex-wrap: wrap;
      }
      .count-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 4.25rem;
      }
      .count-num {
        font-family: var(--font-display);
        font-size: clamp(1.8rem, 5vw, 3rem);
        font-weight: 600;
        line-height: 1;
      }
      .count-label {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.62rem;
        margin-top: 0.4rem;
        color: rgba(255, 255, 255, 0.82);
      }
      .just-married {
        font-family: var(--font-display);
        font-size: clamp(1.1rem, 3vw, 1.5rem);
      }
      .scroll-cue {
        position: absolute;
        bottom: 1.75rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.5rem;
        animation: bob 2s ease-in-out infinite;
      }
      .scroll-cue:hover {
        color: #fff;
      }
      @keyframes bob {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, 8px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .scroll-cue { animation: none; }
      }
    `,
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly cfg = siteConfig;
  readonly countdown = signal<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    passed: false,
  });

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.update();
    this.timer = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private update(): void {
    const target = new Date(this.cfg.weddingDateISO).getTime();
    let diff = target - Date.now();

    if (isNaN(target) || diff <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: diff <= 0 });
      return;
    }

    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    const days = Math.floor(diff / day);
    diff -= days * day;
    const hours = Math.floor(diff / hour);
    diff -= hours * hour;
    const minutes = Math.floor(diff / minute);
    diff -= minutes * minute;
    const seconds = Math.floor(diff / 1000);

    this.countdown.set({ days, hours, minutes, seconds, passed: false });
  }
}
