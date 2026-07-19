import { Injectable, computed, effect, signal } from '@angular/core';
import { siteConfig, PixGift } from './site-config';

export interface CartItem {
  gift: PixGift;
  quantity: number;
}

interface StoredCart {
  items: { name: string; quantity: number }[];
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

  /** Quantidade total de presentes selecionados (somando as quantidades). */
  readonly count = computed(() => this._items().reduce((n, i) => n + i.quantity, 0));

  /** Valor total em reais da seleção. */
  readonly total = computed(() =>
    this._items().reduce((sum, i) => sum + i.gift.value * i.quantity, 0),
  );

  /** Mensagem do cartão escrita no checkout (persistida entre páginas). */
  readonly cardMessage = signal('');

  constructor() {
    this.restore();
    // Persiste a seleção sempre que os itens ou a mensagem do cartão mudam.
    effect(() => this.persist(this._items(), this.cardMessage()));
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

  /** Remove apenas os presentes, mantendo a mensagem do cartão. */
  clearItems(): void {
    this._items.set([]);
  }

  quantityOf(gift: PixGift): number {
    return this._items().find((i) => i.gift.name === gift.name)?.quantity ?? 0;
  }

  clear(): void {
    this._items.set([]);
    this.cardMessage.set('');
  }

  /** Recarrega a seleção salva, casando os nomes com os presentes atuais. */
  private restore(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredCart;
      const items = (parsed.items ?? [])
        .map((stored) => {
          const gift = siteConfig.registry.gifts.find((g) => g.name === stored.name);
          return gift && stored.quantity > 0 ? { gift, quantity: stored.quantity } : null;
        })
        .filter((i): i is CartItem => i !== null);
      this._items.set(items);
      this.cardMessage.set(parsed.cardMessage ?? '');
    } catch {
      // Estado salvo inválido — ignora e começa com um carrinho vazio.
    }
  }

  private persist(items: CartItem[], cardMessage: string): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const data: StoredCart = {
        items: items.map((i) => ({ name: i.gift.name, quantity: i.quantity })),
        cardMessage,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage indisponível (ex.: modo privado) — segue sem persistir.
    }
  }
}
