import { Component } from '@angular/core';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="wedding-footer text-center">
      <div class="container">
        <div class="footer-monogram text-script">{{ cfg.monogram }}</div>
        <p class="footer-message">{{ cfg.footerMessage }}</p>
        <p class="footer-date">{{ cfg.displayDate }} · {{ cfg.location }}</p>
        @if (cfg.hashtag) {
          <p class="footer-hashtag">{{ cfg.hashtag }}</p>
        }
        <div class="footer-rule"></div>
        <p class="footer-credit">
          Feito com <i class="bi bi-heart-fill"></i> para {{ cfg.partnerOne }} &amp;
          {{ cfg.partnerTwo }}
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .wedding-footer {
        background: #3f4a34;
        color: rgba(255, 255, 255, 0.85);
        padding: 3.5rem 0 2.5rem;
      }
      .footer-monogram {
        font-size: 3rem;
        color: #e7cf9d !important;
        line-height: 1;
        margin-bottom: 0.75rem;
      }
      .footer-message {
        font-family: var(--font-display);
        font-size: 1.25rem;
        color: #fff;
        margin-bottom: 0.4rem;
      }
      .footer-date {
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }
      .footer-hashtag {
        color: #e7cf9d;
        font-weight: 700;
        letter-spacing: 0.06em;
      }
      .footer-rule {
        width: 60px;
        height: 1px;
        background: rgba(231, 207, 157, 0.5);
        margin: 1.75rem auto;
      }
      .footer-credit {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 0;
      }
      .footer-credit .bi-heart-fill {
        color: #d98c8c;
        font-size: 0.75rem;
        margin: 0 0.15rem;
      }
    `,
  ],
})
export class FooterComponent {
  readonly cfg = siteConfig;
}
