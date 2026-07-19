import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as QRCode from 'qrcode';
import { siteConfig } from '../site-config';
import { CartService } from '../cart.service';
import { gerarPixCopiaCola } from '../pix';

type CheckoutStep = 'list' | 'payment' | 'card' | 'done';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section page-top bg-cream">
      <div class="container">
        <div class="text-center">
          <p class="section-eyebrow">{{ heading().eyebrow }}</p>
          <h2 class="section-title">{{ heading().title }}</h2>
          <div class="ornament"><i class="bi" [class]="heading().icon"></i></div>
        </div>

        @switch (step()) {
          <!-- Passo 1: revisão da lista de presentes -->
          @case ('list') {
            @if (cart.count() === 0) {
              <div class="empty-state text-center mx-auto">
                <i class="bi bi-bag empty-icon"></i>
                <p class="text-muted mb-4">Você ainda não selecionou nenhum presente.</p>
                <a routerLink="/presentes" class="btn btn-wedding">Ver lista de presentes</a>
              </div>
            } @else {
              <div class="row justify-content-center">
                <div class="col-lg-7">
                  <div class="checkout-panel">
                    <h3 class="panel-title">Seus presentes</h3>
                    @for (item of cart.items(); track item.gift.name) {
                      <div class="cart-row">
                        <div class="cart-info">
                          <span class="cart-name">{{ item.gift.name }}</span>
                          <span class="cart-unit">{{ formatBRL(item.gift.value) }} cada</span>
                        </div>
                        <div class="qty-stepper">
                          <button type="button" class="qty-btn" aria-label="Remover um" (click)="cart.decrement(item.gift)">
                            <i class="bi bi-dash-lg"></i>
                          </button>
                          <span class="qty-value">{{ item.quantity }}</span>
                          <button type="button" class="qty-btn" aria-label="Adicionar mais um" (click)="cart.increment(item.gift)">
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                        <span class="cart-subtotal">{{ formatBRL(item.gift.value * item.quantity) }}</span>
                        <button type="button" class="remove-btn" aria-label="Remover presente" (click)="cart.remove(item.gift)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    }

                    <div class="cart-total">
                      <span>Total</span>
                      <span>{{ formatBRL(cart.total()) }}</span>
                    </div>

                    <button type="button" class="btn btn-wedding w-100 mt-4" (click)="confirmList()">
                      Confirmar lista e gerar código Pix
                    </button>
                  </div>

                  <div class="text-center mt-4">
                    <a routerLink="/presentes" class="back-link">
                      <i class="bi bi-arrow-left me-1"></i> Voltar para a lista de presentes
                    </a>
                  </div>
                </div>
              </div>
            }
          }

          <!-- Passo 2: pagamento via Pix -->
          @case ('payment') {
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="checkout-panel text-center">
                  <p class="pix-disclaimer">
                    <i class="bi bi-info-circle me-2"></i>Confirme os dados do Pix: deve ser para
                    <strong>Rodrigo Chioca Anater</strong>, instituição
                    <strong>Nu Pagamentos</strong>.
                  </p>

                  <p class="pix-amount">{{ formatBRL(cart.total()) }}</p>

                  @if (qrDataUrl()) {
                    <div class="pix-qr">
                      <img [src]="qrDataUrl()" alt="QR Code Pix para pagamento" width="240" height="240" />
                    </div>
                  }

                  <p class="text-muted mb-3">
                    Escaneie o QR Code com o app do seu banco ou copie o código abaixo e cole na opção
                    <strong>Pix Copia e Cola</strong>.
                  </p>
                  <textarea class="pix-code" rows="4" readonly>{{ pixCode() }}</textarea>
                  <button type="button" class="btn btn-wedding-outline w-100 mt-3" (click)="copy()">
                    @if (copied()) {
                      <i class="bi bi-check-lg me-1"></i> Código copiado!
                    } @else {
                      <i class="bi bi-clipboard me-1"></i> Copiar código Pix
                    }
                  </button>

                  <div class="d-flex gap-2 mt-4">
                    <button type="button" class="btn btn-wedding-outline flex-fill" (click)="backToList()">
                      Voltar
                    </button>
                    <button type="button" class="btn btn-wedding flex-fill" (click)="confirmPayment()">
                      Confirmar pagamento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Passo 3: mensagem do cartão -->
          @case ('card') {
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="checkout-panel">
                  <p class="text-muted text-center mb-4">
                    Se quiser, deixe uma mensagem carinhosa para os noivos.
                  </p>

                  <label for="cardName" class="card-label">Seu nome</label>
                  <input
                    id="cardName"
                    type="text"
                    class="card-input"
                    placeholder="Como você quer assinar o cartão"
                    [value]="cart.cardName()"
                    (input)="onNameInput($event)"
                    [disabled]="sending()"
                  />

                  <label for="cardMessage" class="card-label mt-3">Mensagem</label>
                  <textarea
                    id="cardMessage"
                    class="card-textarea"
                    rows="6"
                    placeholder="Escreva o seu cartão…"
                    [value]="cart.cardMessage()"
                    (input)="onCardInput($event)"
                    [disabled]="sending()"
                  ></textarea>

                  @if (sendError()) {
                    <p class="send-error mt-3">
                      <i class="bi bi-exclamation-triangle me-2"></i>{{ sendError() }}
                    </p>
                  }

                  <div class="d-flex gap-2 mt-4">
                    <button
                      type="button"
                      class="btn btn-wedding-outline flex-fill"
                      (click)="skipCard()"
                      [disabled]="sending()"
                    >
                      Não enviar cartão
                    </button>
                    <button
                      type="button"
                      class="btn btn-wedding flex-fill"
                      (click)="sendCard()"
                      [disabled]="sending()"
                    >
                      @if (sending()) {
                        <span class="spinner-border spinner-border-sm me-1"></span> Enviando…
                      } @else {
                        Enviar cartão
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Passo 4: agradecimento -->
          @case ('done') {
            <div class="empty-state text-center mx-auto">
              <div class="done-check"><i class="bi bi-heart-fill"></i></div>
              @if (cardSent()) {
                <p class="done-message">
                  Seu cartão foi enviado aos noivos! Sua contribuição significa muito para nós.
                  Mal podemos esperar para celebrar com você!
                </p>
              } @else {
                <p class="done-message">
                  Sua contribuição significa muito para nós. Mal podemos esperar para celebrar com você!
                </p>
              }
              <a routerLink="/" class="btn btn-wedding">Voltar ao início</a>
            </div>
          }
        }
      </div>
    </section>
  `,
  styles: [
    `
      .page-top {
        padding-top: 7.5rem;
      }
      .empty-state {
        max-width: 460px;
        padding: 2rem 0;
      }
      .empty-icon {
        font-size: 3rem;
        color: var(--gold);
        display: block;
        margin-bottom: 1rem;
      }
      .done-check {
        width: 72px;
        height: 72px;
        margin: 0 auto 1.25rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--sage);
        color: #fff;
        font-size: 2rem;
      }
      .done-message {
        font-size: 1.15rem;
        color: var(--ink);
        margin-bottom: 1.75rem;
      }
      .checkout-panel {
        background: var(--white);
        border-radius: 1rem;
        padding: 2rem 1.75rem;
        box-shadow: 0 8px 26px rgba(59, 58, 54, 0.06);
      }
      .panel-title {
        font-size: 1.35rem;
        margin-bottom: 1.25rem;
      }
      .cart-row {
        display: grid;
        grid-template-columns: 1fr auto auto auto;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 0;
        border-bottom: 1px solid rgba(59, 58, 54, 0.08);
      }
      .cart-info {
        display: flex;
        flex-direction: column;
        text-align: left;
        min-width: 0;
      }
      .cart-name {
        font-weight: 700;
      }
      .cart-unit {
        font-size: 0.8rem;
        color: var(--muted);
      }
      .cart-subtotal {
        font-weight: 700;
        color: var(--gold-dark);
        min-width: 72px;
        text-align: right;
      }
      .qty-stepper {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }
      .qty-btn {
        width: 32px;
        height: 32px;
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
        font-weight: 700;
        min-width: 1.25rem;
        text-align: center;
      }
      .remove-btn {
        border: none;
        background: transparent;
        color: var(--muted);
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.2s ease;
      }
      .remove-btn:hover {
        color: #c0553f;
      }
      .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.25rem;
        padding-top: 1rem;
        border-top: 2px solid rgba(59, 58, 54, 0.1);
        font-family: var(--font-display);
        font-size: 1.3rem;
        font-weight: 700;
      }
      .cart-total span:last-child {
        color: var(--gold-dark);
      }
      .card-label {
        display: block;
        font-weight: 700;
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
      }
      .card-input,
      .card-textarea {
        width: 100%;
        border: 1px solid rgba(59, 58, 54, 0.15);
        border-radius: 0.6rem;
        padding: 0.75rem;
        font-family: var(--font-body);
        color: var(--ink);
        background: var(--cream);
      }
      .card-textarea {
        resize: vertical;
      }
      .card-input:focus,
      .card-textarea:focus {
        outline: none;
        border-color: var(--gold);
      }
      .send-error {
        color: #c0553f;
        font-size: 0.9rem;
        margin-bottom: 0;
      }
      .pix-disclaimer {
        margin: 0 auto 1.5rem;
        padding: 0.9rem 1.25rem;
        background: var(--sand);
        border-radius: 0.75rem;
        color: var(--ink);
        font-size: 0.95rem;
      }
      .pix-amount {
        font-family: var(--font-script);
        color: var(--gold-dark);
        font-size: 2.4rem;
        line-height: 1;
        margin-bottom: 1rem;
      }
      .pix-qr {
        margin: 0 auto 1rem;
      }
      .pix-qr img {
        width: 100%;
        max-width: 220px;
        height: auto;
        border-radius: 0.6rem;
        border: 1px solid rgba(59, 58, 54, 0.1);
        padding: 0.5rem;
        background: #fff;
      }
      .pix-code {
        width: 100%;
        font-family: monospace;
        font-size: 0.8rem;
        word-break: break-all;
        resize: none;
        border: 1px solid rgba(59, 58, 54, 0.15);
        border-radius: 0.6rem;
        padding: 0.75rem;
        background: var(--cream);
        color: var(--ink);
      }
      .back-link {
        color: var(--sage-dark);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.78rem;
        text-decoration: none;
      }
      .back-link:hover {
        color: var(--gold-dark);
      }
    `,
  ],
})
export class CheckoutPageComponent {
  readonly cfg = siteConfig;
  readonly cart = inject(CartService);

  readonly step = signal<CheckoutStep>('list');
  readonly qrDataUrl = signal('');
  readonly copied = signal(false);
  readonly sending = signal(false);
  readonly sendError = signal('');
  readonly cardSent = signal(false);

  private readonly headings: Record<CheckoutStep, { eyebrow: string; title: string; icon: string }> = {
    list: { eyebrow: 'Quase lá', title: 'Checkout', icon: 'bi-bag-heart' },
    payment: { eyebrow: 'Pagamento', title: 'Pagamento via Pix', icon: 'bi-qr-code' },
    card: { eyebrow: 'Falta pouco', title: 'Deixe um cartão', icon: 'bi-envelope-heart' },
    done: { eyebrow: 'Com carinho', title: 'Obrigado!', icon: 'bi-heart-fill' },
  };
  readonly heading = computed(() => this.headings[this.step()]);

  /** Código Pix Copia e Cola para o valor total da seleção. */
  readonly pixCode = computed(() => {
    const total = this.cart.total();
    if (total <= 0) return '';
    return gerarPixCopiaCola(this.cfg.pix.chave, this.cfg.pix.nome, this.cfg.pix.cidade, total);
  });

  constructor() {
    // Regenera o QR Code sempre que o código Pix muda (total alterado).
    effect(() => {
      const code = this.pixCode();
      this.copied.set(false);
      if (!code) {
        this.qrDataUrl.set('');
        return;
      }
      QRCode.toDataURL(code, { width: 240, margin: 1, errorCorrectionLevel: 'M' })
        .then((url) => this.qrDataUrl.set(url))
        .catch(() => this.qrDataUrl.set(''));
    });
  }

  formatBRL(value: number): string {
    return 'R$ ' + value.toFixed(2).replace('.', ',');
  }

  onNameInput(event: Event): void {
    this.cart.cardName.set((event.target as HTMLInputElement).value);
    if (this.sendError()) this.sendError.set('');
  }

  onCardInput(event: Event): void {
    this.cart.cardMessage.set((event.target as HTMLTextAreaElement).value);
  }

  confirmList(): void {
    if (this.cart.count() === 0) return;
    this.goToStep('payment');
  }

  backToList(): void {
    this.goToStep('list');
  }

  confirmPayment(): void {
    // Pagamento confirmado: guarda o snapshot dos presentes e esvazia o carrinho.
    this.sendError.set('');
    this.cart.confirmOrder();
    this.goToStep('card');
  }

  async sendCard(): Promise<void> {
    const name = this.cart.cardName().trim();
    if (!name) {
      this.sendError.set('Por favor, informe o seu nome para enviar o cartão.');
      return;
    }
    const accessKey = this.cfg.card.web3formsAccessKey;
    if (!accessKey) {
      this.sendError.set('O envio de cartão ainda não está configurado.');
      return;
    }

    this.sendError.set('');
    this.sending.set(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Casamento] Presente de ${name}`,
          from_name: name,
          Nome: name,
          Presente: this.buildGiftsText(),
          Mensagem: this.cart.cardMessage().trim() || '(sem mensagem)',
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data?.message ?? 'Falha no envio');
      }
      this.cardSent.set(true);
      this.cart.clearOrder();
      this.goToStep('done');
    } catch {
      this.sendError.set(
        'Não foi possível enviar o cartão. Verifique sua conexão e tente novamente.',
      );
    } finally {
      this.sending.set(false);
    }
  }

  skipCard(): void {
    this.cardSent.set(false);
    this.cart.clearOrder();
    this.goToStep('done');
  }

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.pixCode());
      this.copied.set(true);
    } catch {
      const el = document.querySelector<HTMLTextAreaElement>('.pix-code');
      el?.select();
    }
  }

  /** Monta o texto da seção "Presente" com os itens do último pedido. */
  private buildGiftsText(): string {
    const lines = this.cart
      .lastOrder()
      .map((i) => `${i.quantity}x ${i.gift.name} — ${this.formatBRL(i.gift.value * i.quantity)}`);
    lines.push(`Total: ${this.formatBRL(this.cart.lastOrderTotal())}`);
    return lines.join('\n');
  }

  private goToStep(step: CheckoutStep): void {
    this.step.set(step);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
