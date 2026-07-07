import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="registry" class="section bg-cream">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Com Gratidão</p>
          <h2 class="section-title">Presentes &amp; Lista</h2>
          <div class="ornament"><i class="bi bi-gift"></i></div>
          <p class="section-subtitle mb-5">{{ cfg.registry.intro }}</p>
        </div>

        <div class="row g-4 justify-content-center">
          @for (item of cfg.registry.items; track item.name) {
            <div class="col-sm-6 col-lg-4">
              <a
                [href]="item.url"
                target="_blank"
                rel="noopener"
                class="registry-card h-100 d-block text-center"
                appReveal
              >
                <div class="registry-icon"><i class="bi" [class]="item.icon"></i></div>
                <h3 class="registry-title">{{ item.name }}</h3>
                <p class="text-muted mb-3">{{ item.description }}</p>
                <span class="registry-cta">Acessar <i class="bi bi-arrow-up-right ms-1"></i></span>
              </a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .registry-card {
        background: var(--white);
        border-radius: 1rem;
        padding: 2.5rem 1.75rem;
        color: var(--ink);
        box-shadow: 0 8px 26px rgba(59, 58, 54, 0.06);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .registry-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(59, 58, 54, 0.12);
        color: var(--ink);
      }
      .registry-icon {
        width: 66px;
        height: 66px;
        margin: 0 auto 1.1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--sand);
        color: var(--gold-dark);
        font-size: 1.7rem;
      }
      .registry-title {
        font-size: 1.35rem;
        margin-bottom: 0.5rem;
      }
      .registry-cta {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
        color: var(--gold-dark);
      }
    `,
  ],
})
export class RegistryComponent {
  readonly cfg = siteConfig;
}
