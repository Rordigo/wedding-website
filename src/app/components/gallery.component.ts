import { Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="gallery" class="section bg-blush">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Moments</p>
          <h2 class="section-title">Our Gallery</h2>
          <div class="ornament"><i class="bi bi-camera"></i></div>
        </div>

        <div class="gallery-grid" appReveal>
          @for (photo of cfg.gallery; track photo.caption) {
            <figure class="gallery-tile">
              @if (photo.src) {
                <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
              } @else {
                <div class="gallery-placeholder">
                  <i class="bi bi-image"></i>
                </div>
              }
              <figcaption>{{ photo.caption }}</figcaption>
            </figure>
          }
        </div>

        <p class="text-center text-muted small mt-4 mb-0">
          <i class="bi bi-info-circle me-1"></i>
          Add your own photos to <code>public/images/</code> and reference them in
          <code>site-config.ts</code>.
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .gallery-tile {
        position: relative;
        margin: 0;
        border-radius: 0.85rem;
        overflow: hidden;
        aspect-ratio: 4 / 3;
        box-shadow: 0 8px 24px rgba(59, 58, 54, 0.1);
        cursor: default;
      }
      .gallery-tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      .gallery-tile:hover img {
        transform: scale(1.06);
      }
      .gallery-placeholder {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        font-size: 2.6rem;
        color: rgba(255, 255, 255, 0.85);
        background:
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.06) 0,
            rgba(255, 255, 255, 0.06) 12px,
            transparent 12px,
            transparent 24px
          ),
          linear-gradient(150deg, var(--sage) 0%, var(--sage-dark) 100%);
      }
      figcaption {
        position: absolute;
        inset: auto 0 0 0;
        padding: 1.5rem 1rem 0.85rem;
        color: #fff;
        font-family: var(--font-display);
        font-size: 0.95rem;
        background: linear-gradient(transparent, rgba(30, 36, 24, 0.7));
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s ease, transform 0.35s ease;
      }
      .gallery-tile:hover figcaption,
      .gallery-placeholder + figcaption {
        opacity: 1;
        transform: none;
      }
    `,
  ],
})
export class GalleryComponent {
  readonly cfg = siteConfig;
}
