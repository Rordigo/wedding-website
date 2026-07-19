import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="story" class="section bg-cream">
      <div class="container">
        <div class="text-center" appReveal>
          <h2 class="section-title">{{ cfg.story.heading }}</h2>
          <div class="ornament"><i class="bi bi-suit-heart-fill"></i></div>
        </div>

        <div class="story-text mx-auto" appReveal>
          @for (p of cfg.story.paragraphs; track $index) {
            <p>{{ p }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .story-text {
        max-width: 720px;
      }
      .story-text p {
        font-size: 1.1rem;
        line-height: 1.9;
        color: var(--muted);
        margin-bottom: 1.5rem;
        text-align: center;
      }
      .story-text p:last-child {
        margin-bottom: 0;
      }
      .story-text p:first-child::first-letter {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 3.2rem;
        line-height: 1;
      }
      @media (min-width: 768px) {
        .story-text p {
          text-align: justify;
        }
      }
    `,
  ],
})
export class StoryComponent {
  readonly cfg = siteConfig;
}
