import { Injectable, computed, effect, signal } from '@angular/core';
import { siteConfig, PixGift } from './site-config';

export interface CartItem {
  gift: PixGift;
  quantity: number;
}

interface StoredCart {
  items: { name: string; quantity: number }[];
  lastOrder: { name: string; quantity: number }[];
  cardName: string;
  cardMessage: string;
}

const STORAGE_KEY = 'wedding-cart';

/**
 * Estado compartilhado da seleção de presentes entre a página de presentes e
 * o checkout. Baseado em signals, provido na raiz da aplicação e persistido no
 * localStorage para sobreviver a recarregamentos da página.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();

  /**
   * Snapshot dos presentes no momento em que o pagamento é confirmado. O
   * carrinho ativo é esvaziado logo em seguida, mas este snapshot preserva a
   * lista para montar o e-mail do cartão. Limpo após enviar/cancelar o cartão.
   */
  private readonly _lastOrder = signal<CartItem[]>([]);
  readonly lastOrder = this._lastOrder.asReadonly();

  /** Quantidade total de presentes selecionados (somando as quantidades). */
  readonly count = computed(() => this._items().reduce((n, i) => n + i.quantity, 0));

  /** Valor total em reais da seleção. */
  readonly total = computed(() =>
    this._items().reduce((sum, i) => sum + i.gift.value * i.quantity, 0),
  );

  /** Valor total em reais do último pedido confirmado. */
  readonly lastOrderTotal = computed(() =>
    this._lastOrder().reduce((sum, i) => sum + i.gift.value * i.quantity, 0),
  );

  /** Nome de quem envia o cartão (preenchido no checkout). */
  readonly cardName = signal('');

  /** Mensagem do cartão escrita no checkout (persistida entre páginas). */
  readonly cardMessage = signal('');

  constructor() {
    this.restore();
    // Persiste o estado sempre que qualquer parte relevante muda.
    effect(() =>
      this.persist(this._items(), this._lastOrder(), this.cardName(), this.cardMessage()),
    );
  }

  add(gift: PixGift): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.gift.name === gift.name);
      if (existing) {
        return items.map((i) =>
          i.gift.name === gift.name ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { gift, quantity: 1 }];
    });
  }

  increment(gift: PixGift): void {
    this.add(gift);
  }

  decrement(gift: PixGift): void {
    const item = this._items().find((i) => i.gift.name === gift.name);
    if (item) {
      this.setQuantity(gift, item.quantity - 1);
    }
  }

  setQuantity(gift: PixGift, quantity: number): void {
    if (quantity <= 0) {
      this.remove(gift);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.gift.name === gift.name ? { ...i, quantity } : i)),
    );
  }

  remove(gift: PixGift): void {
    this._items.update((items) => items.filter((i) => i.gift.name !== gift.name));
  }

  quantityOf(gift: PixGift): number {
    return this._items().find((i) => i.gift.name === gift.name)?.quantity ?? 0;
  }

  /**
   * Confirma o pagamento: guarda os presentes no snapshot e esvazia o carrinho
   * ativo. A mensagem/nome do cartão são reiniciados para um cartão em branco.
   */
  confirmOrder(): void {
    this._lastOrder.set(this._items());
    this._items.set([]);
    this.cardName.set('');
    this.cardMessage.set('');
  }

  /** Limpa o snapshot e os campos do cartão (após enviar ou cancelar). */
  clearOrder(): void {
    this._lastOrder.set([]);
    this.cardName.set('');
    this.cardMessage.set('');
  }

  clear(): void {
    this._items.set([]);
    this._lastOrder.set([]);
    this.cardName.set('');
    this.cardMessage.set('');
  }

  /** Recarrega o estado salvo, casando os nomes com os presentes atuais. */
  private restore(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredCart;
      this._items.set(this.hydrate(parsed.items));
      this._lastOrder.set(this.hydrate(parsed.lastOrder));
      this.cardName.set(parsed.cardName ?? '');
      this.cardMessage.set(parsed.cardMessage ?? '');
    } catch {
      // Estado salvo inválido — ignora e começa com um carrinho vazio.
    }
  }

  /** Converte itens salvos (nome + quantidade) em itens com o presente atual. */
  private hydrate(stored: { name: string; quantity: number }[] | undefined): CartItem[] {
    return (stored ?? [])
      .map((s) => {
        const gift = siteConfig.registry.gifts.find((g) => g.name === s.name);
        return gift && s.quantity > 0 ? { gift, quantity: s.quantity } : null;
      })
      .filter((i): i is CartItem => i !== null);
  }

  private persist(
    items: CartItem[],
    lastOrder: CartItem[],
    cardName: string,
    cardMessage: string,
  ): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const data: StoredCart = {
        items: items.map((i) => ({ name: i.gift.name, quantity: i.quantity })),
        lastOrder: lastOrder.map((i) => ({ name: i.gift.name, quantity: i.quantity })),
        cardName,
        cardMessage,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage indisponível (ex.: modo privado) — segue sem persistir.
    }
  }
}
