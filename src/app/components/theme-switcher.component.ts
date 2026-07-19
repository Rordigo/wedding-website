import { Component, signal } from '@angular/core';

/**
 * Dev-only palette tester. Floating panel (bottom-right) that swaps the
 * site's colour scheme live by toggling `data-theme` on <html>. Palettes
 * are defined in src/styles.scss. Choice is remembered in localStorage.
 *
 * To ship without it: remove this component from app.ts / app.html and
 * delete the alternate-palette blocks in styles.scss.
 */
interface Palette {
  /** matches :root[data-theme='id'] in styles.scss; '' = default (Sage & Gold) */
  id: string;
  name: string;
  /** [primary, secondary, background] preview dots */
  swatch: [string, string, string];
}

const PALETTES: Palette[] = [
  // id '' = the baked-in default (:root in styles.scss), currently Coral & Peach.
  { id: '', name: 'Coral & Peach', swatch: ['#a75d5d', '#f0997d', '#ffc3a1'] },
  { id: 'sage', name: 'Sage & Gold', swatch: ['#5e6d4f', '#bd9a5f', '#faf6f0'] },
  { id: 'blue', name: 'Dusty Blue', swatch: ['#52708a', '#c8a97e', '#f7f8fa'] },
  { id: 'terracotta', name: 'Terracotta', swatch: ['#a85c3c', '#d19a5c', '#fbf6f1'] },
  { id: 'blush', name: 'Blush & Mauve', swatch: ['#9c5f74', '#c9a267', '#fdf7f7'] },
  { id: 'burgundy', name: 'Burgundy & Gold', swatch: ['#7a2f38', '#c19a5b', '#faf5f3'] },
  { id: 'emerald', name: 'Emerald & Gold', swatch: ['#2f5f45', '#c9a860', '#f5f8f5'] },
  { id: 'navy', name: 'Navy & Blush', swatch: ['#2f3c5c', '#c19a6b', '#f8f8fa'] },
];

const STORAGE_KEY = 'wedding-theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <div class="ts">
      <button
        class="ts__fab"
        type="button"
        (click)="toggle()"
        aria-label="Testar paletas de cores"
        title="Testar paletas de cores">
        <i class="bi bi-palette"></i>
      </button>

      @if (open()) {
        <div class="ts__panel">
          <p class="ts__title">Paletas <span>· teste</span></p>
          @for (p of palettes; track p.id) {
            <button
              class="ts__item"
              type="button"
              [class.ts__item--active]="active() === p.id"
              (click)="select(p.id)">
              <span class="ts__swatch">
                @for (c of p.swatch; track $index) {
                  <span [style.background]="c"></span>
                }
              </span>
              <span class="ts__name">{{ p.name }}</span>
              @if (active() === p.id) {
                <i class="bi bi-check2 ts__check"></i>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .ts {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 2000;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .ts__fab {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: none;
      background: #2b2b2b;
      color: #fff;
      font-size: 1.25rem;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }
    .ts__fab:hover {
      transform: scale(1.06);
    }
    .ts__panel {
      position: absolute;
      right: 0;
      bottom: 3.75rem;
      width: 15rem;
      background: #fff;
      border-radius: 0.75rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
      padding: 0.5rem;
    }
    .ts__title {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #888;
      margin: 0.35rem 0.5rem 0.5rem;
    }
    .ts__title span {
      text-transform: none;
      letter-spacing: 0;
    }
    .ts__item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      width: 100%;
      border: none;
      background: transparent;
      padding: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      text-align: left;
    }
    .ts__item:hover {
      background: #f2f2f2;
    }
    .ts__item--active {
      background: #eee;
    }
    .ts__swatch {
      display: inline-flex;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.1);
      flex: none;
    }
    .ts__swatch span {
      width: 0.9rem;
      height: 1.1rem;
      display: block;
    }
    .ts__name {
      font-size: 0.85rem;
      color: #222;
      flex: 1;
    }
    .ts__check {
      color: #2b8a3e;
    }
  `,
})
export class ThemeSwitcherComponent {
  readonly palettes = PALETTES;
  readonly open = signal(false);
  readonly active = signal('');

  constructor() {
    this.apply(localStorage.getItem(STORAGE_KEY) ?? '');
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  select(id: string): void {
    this.apply(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  private apply(id: string): void {
    this.active.set(id);
    const root = document.documentElement;
    if (id) {
      root.setAttribute('data-theme', id);
    } else {
      root.removeAttribute('data-theme');
    }
    // Keep the mobile browser-chrome colour in sync with the active theme.
    const primary = getComputedStyle(root).getPropertyValue('--sage-dark').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && primary) {
      meta.setAttribute('content', primary);
    }
  }
}
