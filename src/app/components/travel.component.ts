import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="travel" class="section bg-sand">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Plan Your Stay</p>
          <h2 class="section-title">Travel &amp; Accommodation</h2>
          <div class="ornament"><i class="bi bi-signpost-2"></i></div>
          <p class="section-subtitle mb-5">{{ cfg.travel.intro }}</p>
        </div>

        <div class="row g-4 justify-content-center">
          @for (place of cfg.travel.items; track place.title) {
            <div class="col-md-6 col-lg-5">
              <div class="travel-card h-100 d-flex" appReveal>
                <div class="travel-icon"><i class="bi" [class]="place.icon"></i></div>
                <div>
                  <h3 class="travel-title">{{ place.title }}</h3>
                  <p class="travel-price mb-1">{{ place.time }}</p>
                  <p class="mb-1">{{ place.venue }}</p>
                  <p class="text-muted small mb-2">{{ place.address }}</p>
                  @if (place.note) {
                    <p class="text-muted small fst-italic mb-2">{{ place.note }}</p>
                  }
                  @if (place.mapUrl) {
                    <a [href]="place.mapUrl" target="_blank" rel="noopener" class="travel-link">
                      <i class="bi bi-geo-alt me-1"></i>View on map
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .travel-card {
        background: var(--white);
        border-radius: 1rem;
        padding: 1.75rem;
        gap: 1.1rem;
        box-shadow: 0 8px 26px rgba(59, 58, 54, 0.06);
      }
      .travel-icon {
        flex: 0 0 auto;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--blush);
        color: var(--gold-dark);
        font-size: 1.35rem;
      }
      .travel-title {
        font-size: 1.3rem;
        margin-bottom: 0.2rem;
      }
      .travel-price {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 1.25rem;
      }
      .travel-link {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
        color: var(--sage-dark);
      }
      .travel-link:hover {
        color: var(--gold-dark);
      }
    `,
  ],
})
export class TravelComponent {
  readonly cfg = siteConfig;
}
