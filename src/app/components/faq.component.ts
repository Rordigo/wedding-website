import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="faq" class="section bg-sand">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Good to Know</p>
          <h2 class="section-title">Questions &amp; Answers</h2>
          <div class="ornament"><i class="bi bi-patch-question"></i></div>
        </div>

        <div class="accordion faq-accordion mx-auto" id="faqAccordion" appReveal>
          @for (faq of cfg.faqs; track faq.question; let i = $index) {
            <div class="accordion-item">
              <h3 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  [attr.data-bs-target]="'#faq-' + i"
                  [attr.aria-controls]="'faq-' + i"
                >
                  {{ faq.question }}
                </button>
              </h3>
              <div
                [id]="'faq-' + i"
                class="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body">{{ faq.answer }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .faq-accordion {
        max-width: 720px;
      }
      .accordion-item {
        background: var(--white);
        border: none;
        border-radius: 0.75rem !important;
        margin-bottom: 0.9rem;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(59, 58, 54, 0.06);
      }
      .accordion-button {
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--ink);
        padding: 1.15rem 1.35rem;
        background: var(--white);
      }
      .accordion-button:not(.collapsed) {
        color: var(--sage-dark);
        background: var(--cream);
        box-shadow: none;
      }
      .accordion-button:focus {
        box-shadow: none;
        border-color: transparent;
      }
      .accordion-button::after {
        background-size: 1rem;
        filter: sepia(1) saturate(2) hue-rotate(40deg);
      }
      .accordion-body {
        color: var(--muted);
        padding: 0 1.35rem 1.35rem;
        line-height: 1.7;
      }
    `,
  ],
})
export class FaqComponent {
  readonly cfg = siteConfig;
}
