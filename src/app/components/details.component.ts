import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="details" class="section bg-sand">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Quando &amp; Onde</p>
          <h2 class="section-title">A Celebração</h2>
          <div class="ornament"><i class="bi bi-calendar2-heart"></i></div>
          <p class="section-subtitle mb-2">{{ cfg.displayDate }}</p>
          <p class="text-muted mb-5">{{ cfg.displayTime }}</p>
        </div>

        <div class="row g-4 justify-content-center">
          @for (ev of cfg.events; track ev.title) {
            <div class="col-md-6 col-lg-5">
              <div class="detail-card h-100" appReveal>
                <div class="detail-icon"><i class="bi" [class]="ev.icon"></i></div>
                <h3 class="detail-title">{{ ev.title }}</h3>
                <p class="detail-time">{{ ev.time }}</p>
                <p class="detail-venue mb-1">{{ ev.venue }}</p>
                <p class="text-muted small mb-3">{{ ev.address }}</p>
                @if (ev.note) {
                  <p class="detail-note">{{ ev.note }}</p>
                }
                @if (ev.mapUrl) {
                  <a
                    class="btn btn-wedding-outline btn-sm"
                    [href]="ev.mapUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    <i class="bi bi-geo-alt me-1"></i> Ver Mapa
                  </a>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .detail-card {
        background: var(--white);
        border-radius: 1rem;
        padding: 2.5rem 2rem;
        text-align: center;
        box-shadow: 0 10px 30px rgba(59, 58, 54, 0.07);
        border-top: 3px solid var(--gold);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .detail-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(59, 58, 54, 0.12);
      }
      .detail-icon {
        width: 68px;
        height: 68px;
        margin: 0 auto 1.1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--blush);
        color: var(--gold-dark);
        font-size: 1.8rem;
      }
      .detail-title {
        font-size: 1.5rem;
        margin-bottom: 0.35rem;
      }
      .detail-time {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 1.4rem;
        margin-bottom: 0.9rem;
      }
      .detail-venue {
        font-weight: 700;
        letter-spacing: 0.02em;
      }
      .detail-note {
        color: var(--sage-dark);
        font-style: italic;
        margin-bottom: 1.25rem;
      }
    `,
  ],
})
export class DetailsComponent {
  readonly cfg = siteConfig;
}
