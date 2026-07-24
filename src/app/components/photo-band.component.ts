import { Component, computed, input } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

/**
 * A full-bleed strip of photos styled like a roll of camera film that scrolls
 * slowly and endlessly to the left. Dark film base with sprocket-hole rails
 * along the top and bottom; the photos are the film frames.
 *
 * Pass an array of image paths (e.g. ['images/01.jpg', ...]); the strip is
 * duplicated internally so the loop is seamless. Speed is constant regardless
 * of how many photos are passed (see `secondsPerImage`).
 */
@Component({
  selector: 'app-photo-band',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <div class="photo-band" appReveal>
      <div class="marquee-track" [style.animation-duration.s]="durationSeconds()">
        @for (src of loopImages(); track $index) {
          <figure class="band-tile">
            <img [src]="src" alt="" loading="lazy" />
          </figure>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .photo-band {
        position: relative;
        width: 100%;
        overflow: hidden;
        background: #17110f; /* film base */
      }

      /* Sprocket-hole rails — static, so the perforations stay steady while the
         frames scroll past, like film running through a gate. */
      .photo-band::before,
      .photo-band::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 22px;
        z-index: 2;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='22'%3E%3Crect x='8.5' y='6.5' width='13' height='9' rx='2.5' fill='%23fff8f4'/%3E%3C/svg%3E");
        background-repeat: repeat-x;
        background-size: auto 100%;
        background-position: left center;
      }
      .photo-band::before {
        top: 0;
      }
      .photo-band::after {
        bottom: 0;
      }

      .marquee-track {
        display: flex;
        width: max-content;
        padding: 22px 0; /* leave room for the sprocket rails */
        animation-name: band-scroll;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
      }
      /* Each frame owns its trailing gap via margin (not flex 'gap'), so one full
         copy is exactly half the track width — the -50% loop is seamless. The
         dark gap reads as the frame line between negatives. */
      .band-tile {
        flex: 0 0 auto;
        width: clamp(200px, 24vw, 300px);
        height: clamp(220px, 28vw, 340px);
        margin: 0 6px 0 0;
        overflow: hidden;
        background: #17110f;
      }
      .band-tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.6s ease;
      }

      /* Pause the drift while a visitor lingers, and gently zoom the hovered photo. */
      .photo-band:hover .marquee-track {
        animation-play-state: paused;
      }
      .band-tile:hover img {
        transform: scale(1.05);
      }

      @keyframes band-scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }

      @media (max-width: 640px) {
        .photo-band::before,
        .photo-band::after {
          height: 15px;
        }
        .marquee-track {
          padding: 15px 0;
        }
        .band-tile {
          width: clamp(170px, 55vw, 230px);
          height: clamp(200px, 62vw, 280px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .marquee-track {
          animation: none;
        }
      }
    `,
  ],
})
export class PhotoBandComponent {
  readonly images = input.required<string[]>();
  /** Seconds each photo takes to advance — higher is slower. */
  readonly secondsPerImage = input(5);

  /** Two back-to-back copies so scrolling one full set loops seamlessly. */
  readonly loopImages = computed(() => [...this.images(), ...this.images()]);

  /** Duration to scroll exactly one copy (half the doubled track). */
  readonly durationSeconds = computed(() => this.images().length * this.secondsPerImage());
}
