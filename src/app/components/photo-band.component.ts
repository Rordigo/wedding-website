import { Component, computed, ElementRef, HostListener, inject, input, signal } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

/**
 * A full-bleed strip of photos styled like a roll of camera film that scrolls
 * slowly and endlessly to the left. Dark film base with sprocket-hole rails
 * along the top and bottom; the photos are the film frames. The whole strip —
 * perforations included — moves together, since the rails live on each frame.
 *
 * Clicking the strip pauses it; clicking it again, clicking elsewhere, or
 * scrolling resumes it.
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
      <div
        class="marquee-track"
        [class.is-paused]="paused()"
        [style.animation-duration.s]="durationSeconds()"
      >
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
        width: 100%;
        overflow: hidden;
        background: #17110f; /* film base */
      }

      .marquee-track {
        display: flex;
        width: max-content;
        animation-name: band-scroll;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
      }
      .marquee-track.is-paused {
        animation-play-state: paused;
      }

      /* Each frame carries its own sprocket-hole rails (top + bottom) as
         background layers sized to a fixed count per frame, so the perforations
         travel with the photos and stay continuous across flush frames. The
         3px side padding shows the dark base as the frame line between frames. */
      .band-tile {
        box-sizing: border-box;
        flex: 0 0 auto;
        width: clamp(200px, 24vw, 300px);
        height: clamp(240px, 30vw, 360px);
        padding: 22px 3px;
        margin: 0;
        overflow: hidden;
        cursor: pointer;
        background-color: #17110f;
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='22'%3E%3Crect x='8.5' y='6.5' width='13' height='9' rx='2.5' fill='%23fff8f4'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='22'%3E%3Crect x='8.5' y='6.5' width='13' height='9' rx='2.5' fill='%23fff8f4'/%3E%3C/svg%3E");
        background-repeat: repeat-x, repeat-x;
        background-position: left top, left bottom;
        background-size: 10% 22px, 10% 22px;
      }
      .band-tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.6s ease;
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
        .band-tile {
          width: clamp(170px, 55vw, 230px);
          height: clamp(210px, 64vw, 290px);
          padding: 15px 3px;
          background-size: 10% 15px, 10% 15px;
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
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  readonly images = input.required<string[]>();
  /** Seconds each photo takes to advance — higher is slower. */
  readonly secondsPerImage = input(5);

  /** Whether this band's reel is currently paused. */
  readonly paused = signal(false);

  /** Two back-to-back copies so scrolling one full set loops seamlessly. */
  readonly loopImages = computed(() => [...this.images(), ...this.images()]);

  /** Duration to scroll exactly one copy (half the doubled track). */
  readonly durationSeconds = computed(() => this.images().length * this.secondsPerImage());

  /** Clicking this band toggles its reel; a click anywhere else resumes it. */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (this.hostEl.nativeElement.contains(target as Node)) {
      this.paused.update((p) => !p);
    } else {
      this.paused.set(false);
    }
  }

  /** Any scroll resumes the reel. */
  @HostListener('window:scroll')
  onScroll(): void {
    this.paused.set(false);
  }
}
