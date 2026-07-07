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
          <p class="section-eyebrow">Our Journey</p>
          <h2 class="section-title">{{ cfg.story.heading }}</h2>
          <div class="ornament"><i class="bi bi-suit-heart-fill"></i></div>
          <p class="section-subtitle mb-5">{{ cfg.story.intro }}</p>
        </div>

        <div class="story-timeline mx-auto">
          @for (m of cfg.story.milestones; track m.title; let i = $index) {
            <div class="story-row" [class.story-row--right]="i % 2 === 1" appReveal>
              <div class="story-icon">
                <i class="bi" [class]="m.icon"></i>
              </div>
              <div class="story-card">
                <span class="story-date">{{ m.date }}</span>
                <h3 class="story-title">{{ m.title }}</h3>
                <p class="mb-0 text-muted">{{ m.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .story-timeline {
        position: relative;
        max-width: 760px;
        padding: 1rem 0;
      }
      .story-timeline::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 27px;
        width: 2px;
        background: linear-gradient(var(--sage), var(--gold));
        opacity: 0.5;
      }
      .story-row {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        padding-left: 0;
        margin-bottom: 2.25rem;
      }
      .story-icon {
        flex: 0 0 auto;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--white);
        border: 2px solid var(--gold);
        color: var(--gold-dark);
        font-size: 1.4rem;
        z-index: 1;
        box-shadow: 0 6px 16px rgba(94, 109, 79, 0.12);
      }
      .story-card {
        background: var(--white);
        border-radius: 0.9rem;
        padding: 1.5rem 1.75rem;
        box-shadow: 0 8px 26px rgba(59, 58, 54, 0.06);
        flex: 1;
      }
      .story-date {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 1.5rem;
        line-height: 1;
      }
      .story-title {
        font-size: 1.35rem;
        margin: 0.15rem 0 0.6rem;
      }

      /* Desktop: alternate sides */
      @media (min-width: 768px) {
        .story-timeline::before {
          left: 50%;
          transform: translateX(-50%);
        }
        .story-row {
          width: 50%;
          margin-left: auto;
          flex-direction: row;
          padding-left: 2rem;
        }
        .story-row .story-icon {
          position: absolute;
          left: -28px;
          top: 0;
        }
        .story-row--right {
          margin-left: 0;
          margin-right: auto;
          flex-direction: row-reverse;
          padding-left: 0;
          padding-right: 2rem;
          text-align: right;
        }
        .story-row--right .story-icon {
          left: auto;
          right: -28px;
        }
      }
    `,
  ],
})
export class StoryComponent {
  readonly cfg = siteConfig;
}
