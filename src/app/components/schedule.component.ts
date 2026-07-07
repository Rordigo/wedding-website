import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="schedule" class="section bg-cream">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">The Day</p>
          <h2 class="section-title">Order of Events</h2>
          <div class="ornament"><i class="bi bi-clock-history"></i></div>
        </div>

        <div class="schedule-list mx-auto">
          @for (item of cfg.schedule; track item.title) {
            <div class="schedule-item" appReveal>
              <div class="schedule-time">{{ item.time }}</div>
              <div class="schedule-marker">
                <i class="bi" [class]="item.icon"></i>
              </div>
              <div class="schedule-body">
                <h3 class="schedule-title">{{ item.title }}</h3>
                <p class="mb-0 text-muted">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .schedule-list {
        max-width: 640px;
      }
      .schedule-item {
        display: grid;
        grid-template-columns: 90px 48px 1fr;
        align-items: start;
        column-gap: 1rem;
        padding-bottom: 2rem;
        position: relative;
      }
      .schedule-item:not(:last-child) .schedule-marker::after {
        content: '';
        position: absolute;
        top: 44px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: calc(100% - 40px);
        background: var(--gold);
        opacity: 0.35;
      }
      .schedule-time {
        font-family: var(--font-display);
        font-weight: 600;
        text-align: right;
        color: var(--sage-dark);
        padding-top: 0.5rem;
        font-size: 0.95rem;
      }
      .schedule-marker {
        position: relative;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--white);
        border: 2px solid var(--gold);
        color: var(--gold-dark);
        font-size: 1.15rem;
        z-index: 1;
      }
      .schedule-title {
        font-size: 1.25rem;
        margin: 0.3rem 0 0.25rem;
      }
      @media (max-width: 480px) {
        .schedule-item {
          grid-template-columns: 64px 40px 1fr;
          column-gap: 0.6rem;
        }
        .schedule-time {
          font-size: 0.8rem;
        }
      }
    `,
  ],
})
export class ScheduleComponent {
  readonly cfg = siteConfig;
}
