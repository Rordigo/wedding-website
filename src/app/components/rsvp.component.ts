import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="rsvp" class="section rsvp-section text-center">
      <div class="container">
        <div appReveal>
          <p class="section-eyebrow text-light-gold">Participe</p>
          <h2 class="section-title text-white">Confirme sua Presença</h2>
          <div class="ornament ornament--light"><i class="bi bi-envelope-heart"></i></div>
          <p class="rsvp-intro mx-auto">{{ cfg.rsvp.intro }}</p>
          <p class="rsvp-deadline">{{ cfg.rsvp.deadline }}</p>
          <a
            [href]="cfg.rsvp.googleFormUrl"
            target="_blank"
            rel="noopener"
            class="btn btn-rsvp mt-3"
          >
            <i class="bi bi-pencil-square me-2"></i>Confirmar Agora
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .rsvp-section {
        color: #fff;
        background-color: var(--sage-dark);
        background-image:
          radial-gradient(900px 500px at 20% 0%, color-mix(in srgb, var(--gold) 35%, transparent), transparent 55%),
          linear-gradient(160deg, var(--dark-from) 0%, var(--dark-mid) 50%, var(--dark-to) 100%);
      }
      .text-light-gold {
        color: var(--on-dark) !important;
      }
      .rsvp-intro {
        max-width: 34rem;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.1rem;
      }
      .rsvp-deadline {
        font-family: var(--font-display);
        font-style: italic;
        color: var(--on-dark);
        margin-top: 1rem;
      }
      .ornament--light {
        color: var(--on-dark);
      }
      .ornament--light::before {
        background: linear-gradient(to right, transparent, var(--on-dark));
      }
      .ornament--light::after {
        background: linear-gradient(to left, transparent, var(--on-dark));
      }
      .btn-rsvp {
        background: #fff;
        color: var(--sage-dark);
        font-family: var(--font-body);
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-size: 0.82rem;
        padding: 0.85rem 2.5rem;
        border-radius: 2rem;
        transition: all 0.25s ease;
      }
      .btn-rsvp:hover,
      .btn-rsvp:focus {
        background: var(--on-dark);
        color: var(--ink);
        transform: translateY(-2px);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.25);
      }
    `,
  ],
})
export class RsvpComponent {
  readonly cfg = siteConfig;
}
