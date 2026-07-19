import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RevealDirective } from '../reveal.directive';
import { siteConfig, PixGift } from '../site-config';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-gifts-page',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <section class="section page-top bg-cream">
      <div class="container">
        <div class="text-center" appReveal>
          <p class="section-eyebrow">Com Gratidão</p>
          <h2 class="section-title">Lista de Presentes</h2>
          <div class="ornament"><i class="bi bi-gift"></i></div>
          <p class="section-subtitle">{{ cfg.registry.intro }}</p>
        </div>

        <p class="direct-pix-note mx-auto text-center" appReveal>
          <i class="bi bi-info-circle me-2"></i>{{ cfg.registry.directPixNote }}
        </p>

        <div class="row g-4 justify-content-center mt-2">
          @for (gift of cfg.registry.gifts; track gift.name) {
            <div class="col-sm-6 col-lg-4">
              <div
                class="gift-card h-100 d-flex flex-column text-center"
                [class.selected]="cart.quantityOf(gift) > 0"
                appReveal
              >
                <div class="gift-icon"><i class="bi" [class]="gift.icon"></i></div>
                <h3 class="gift-title">{{ gift.name }}</h3>
                <p class="text-muted mb-3">{{ gift.description }}</p>
                <p class="gift-value">{{ formatBRL(gift.value) }}</p>

                @if (cart.quantityOf(gift) > 0) {
                  <div class="qty-stepper mt-auto">
                    <button type="button" class="qty-btn" aria-label="Remover um" (click)="cart.decrement(gift)">
                      <i class="bi bi-dash-lg"></i>
                    </button>
                    <span class="qty-value">{{ cart.quantityOf(gift) }}</span>
                    <button type="button" class="qty-btn" aria-label="Adicionar mais um" (click)="cart.increment(gift)">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                  <span class="added-label"><i class="bi bi-check-lg me-1"></i>Adicionado</span>
                } @else {
                  <button type="button" class="btn btn-wedding mt-auto" (click)="addGift(gift)">
                    Selecionar presente
                  </button>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Botão flutuante de checkout -->
    <a routerLink="/presentes/checkout" class="checkout-fab" aria-label="Ir para o checkout">
      <i class="bi bi-bag-heart"></i>
      <span>Checkout</span>
      @if (cart.count() > 0) {
        <span class="fab-badge">{{ cart.count() }}</span>
      }
    </a>

    <!-- Pop-up após selecionar um presente -->
    @if (showPopup()) {
      <div class="popup-overlay" (click)="closePopup()">
        <div class="popup-dialog text-center" (click)="$event.stopPropagation()">
          <div class="popup-check"><i class="bi bi-check-lg"></i></div>
          <h3 class="popup-title">Presente adicionado!</h3>
          <p class="text-muted mb-4">O que você deseja fazer agora?</p>
          <button type="button" class="btn btn-wedding w-100 mb-2" (click)="goToCheckout()">
            Ir para o checkout
          </button>
          <button type="button" class="btn btn-wedding-outline w-100" (click)="closePopup()">
            Continuar na lista de presentes
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .page-top {
        padding-top: 7.5rem;
      }
      .direct-pix-note {
        max-width: 620px;
        margin-top: 1.25rem;
        margin-bottom: 0;
        padding: 0.9rem 1.25rem;
        background: var(--sand);
        border-radius: 0.75rem;
        color: var(--ink);
        font-size: 0.95rem;
      }
      .gift-card {
        background: var(--white);
        border-radius: 1rem;
        padding: 2.5rem 1.75rem;
        color: var(--ink);
        box-shadow: 0 8px 26px rgba(59, 58, 54, 0.06);
        border: 2px solid transparent;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .gift-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(59, 58, 54, 0.12);
      }
      .gift-card.selected {
        border-color: var(--gold);
      }
      .gift-icon {
        width: 66px;
        height: 66px;
        margin: 0 auto 1.1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--sand);
        color: var(--gold-dark);
        font-size: 1.7rem;
      }
      .gift-title {
        font-size: 1.35rem;
        margin-bottom: 0.5rem;
      }
      .gift-value {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 1.9rem;
        line-height: 1;
        margin-bottom: 1.25rem;
      }
      .qty-stepper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
      }
      .qty-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--gold);
        background: transparent;
        color: var(--gold-dark);
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .qty-btn:hover {
        background: var(--gold-dark);
        border-color: var(--gold-dark);
        color: #fff;
      }
      .qty-value {
        font-size: 1.2rem;
        font-weight: 700;
        min-width: 1.5rem;
      }
      .added-label {
        display: block;
        margin-top: 0.75rem;
        color: var(--sage-dark);
        font-weight: 700;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      /* Botão flutuante */
      .checkout-fab {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        z-index: 1050;
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.9rem 1.4rem;
        border-radius: 2rem;
        background: var(--sage-dark);
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.78rem;
        text-decoration: none;
        box-shadow: 0 10px 28px rgba(59, 58, 54, 0.28);
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .checkout-fab:hover {
        transform: translateY(-3px);
        background: var(--gold-dark);
        color: #fff;
      }
      .checkout-fab i {
        font-size: 1.2rem;
      }
      .fab-badge {
        position: absolute;
        top: -6px;
        right: -6px;
        min-width: 24px;
        height: 24px;
        padding: 0 6px;
        border-radius: 12px;
        background: var(--gold);
        color: #fff;
        font-size: 0.75rem;
        display: grid;
        place-items: center;
        border: 2px solid var(--cream);
      }

      /* Pop-up */
      .popup-overlay {
        position: fixed;
        inset: 0;
        z-index: 1080;
        display: grid;
        place-items: center;
        padding: 1.25rem;
        background: rgba(59, 58, 54, 0.55);
        backdrop-filter: blur(2px);
      }
      .popup-dialog {
        width: 100%;
        max-width: 400px;
        background: var(--white);
        border-radius: 1rem;
        padding: 2.25rem 1.75rem 1.75rem;
        box-shadow: 0 24px 60px rgba(59, 58, 54, 0.25);
      }
      .popup-check {
        width: 64px;
        height: 64px;
        margin: 0 auto 1rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--sage);
        color: #fff;
        font-size: 1.9rem;
      }
      .popup-title {
        font-size: 1.5rem;
        margin-bottom: 0.4rem;
      }

      @media (max-width: 575.98px) {
        .checkout-fab span:not(.fab-badge) {
          display: none;
        }
        .checkout-fab {
          padding: 1rem;
          border-radius: 50%;
        }
      }
    `,
  ],
})
export class GiftsPageComponent {
  readonly cfg = siteConfig;
  readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly showPopup = signal(false);

  formatBRL(value: number): string {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
  }

  addGift(gift: PixGift): void {
    this.cart.add(gift);
    this.showPopup.set(true);
  }

  closePopup(): void {
    this.showPopup.set(false);
  }

  goToCheckout(): void {
    this.showPopup.set(false);
    this.router.navigate(['/presentes/checkout']);
  }
}
