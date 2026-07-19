import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav
      class="navbar navbar-expand-lg fixed-top wedding-nav"
      [class.scrolled]="scrolled() || !isHome()"
    >
      <div class="container">
        <a class="navbar-brand" routerLink="/" fragment="home">{{ cfg.monogram }}</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            @for (link of links; track link.fragment) {
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/"
                  [fragment]="link.fragment"
                  data-bs-toggle="collapse"
                  data-bs-target="#navMenu"
                  >{{ link.label }}</a
                >
              </li>
            }
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/presentes"
                data-bs-toggle="collapse"
                data-bs-target="#navMenu"
                >Presentes</a
              >
            </li>
            <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
              <a
                class="btn btn-wedding btn-sm"
                routerLink="/"
                fragment="rsvp"
                data-bs-toggle="collapse"
                data-bs-target="#navMenu"
                >Confirmar Presença</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .wedding-nav {
        transition: background-color 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
        padding-top: 1.1rem;
        padding-bottom: 1.1rem;
        background-color: transparent;
      }
      .wedding-nav.scrolled {
        background-color: rgba(250, 246, 240, 0.96);
        box-shadow: 0 2px 18px rgba(59, 58, 54, 0.08);
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        backdrop-filter: blur(6px);
      }
      .navbar-brand {
        font-family: var(--font-script);
        font-size: 1.9rem;
        color: var(--white);
        line-height: 1;
      }
      .nav-link {
        font-family: var(--font-body);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
        color: rgba(255, 255, 255, 0.9);
        padding-left: 0.9rem !important;
        padding-right: 0.9rem !important;
      }
      .nav-link:hover,
      .nav-link:focus {
        color: #fff;
      }

      /* When scrolled (light bg) or on mobile menu, use dark text */
      .wedding-nav.scrolled .navbar-brand,
      .wedding-nav.scrolled .nav-link {
        color: var(--ink);
      }
      .wedding-nav.scrolled .nav-link:hover {
        color: var(--gold-dark);
      }

      .navbar-toggler {
        border: none;
        color: #fff;
      }
      .navbar-toggler:focus {
        box-shadow: none;
      }
      .wedding-nav.scrolled .navbar-toggler-icon {
        filter: invert(1) grayscale(1) brightness(0.4);
      }

      /* On small screens the expanded menu sits on a solid panel */
      @media (max-width: 991.98px) {
        .navbar-collapse {
          background-color: rgba(250, 246, 240, 0.98);
          margin-top: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          box-shadow: 0 8px 24px rgba(59, 58, 54, 0.12);
        }
        .nav-link {
          color: var(--ink) !important;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  readonly cfg = siteConfig;
  readonly scrolled = signal(false);
  readonly isHome = signal(true);
  private readonly router = inject(Router);

  readonly links = [
    { label: 'Início', fragment: 'home' },
    { label: 'Nossa História', fragment: 'story' },
    { label: 'Detalhes', fragment: 'details' },
    { label: 'Programação', fragment: 'schedule' },
    { label: 'Galeria', fragment: 'gallery' },
    { label: 'Hospedagem', fragment: 'travel' },
    { label: 'Dúvidas', fragment: 'faq' },
  ];

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const path = e.urlAfterRedirects.split('#')[0].split('?')[0];
        this.isHome.set(path === '/' || path === '');
      });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
