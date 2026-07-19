import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../reveal.directive';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <section id="registry" class="section bg-cream">
      <div class="container text-center" appReveal>
        <p class="section-eyebrow">Com Gratidão</p>
        <h2 class="section-title">Presentes &amp; Lista</h2>
        <div class="ornament"><i class="bi bi-gift"></i></div>
        <p class="section-subtitle mb-4">{{ cfg.registry.intro }}</p>
        <a routerLink="/presentes" class="btn btn-wedding">
          Ver lista de presentes <i class="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
    </section>
  `,
})
export class RegistryComponent {
  readonly cfg = siteConfig;
}
