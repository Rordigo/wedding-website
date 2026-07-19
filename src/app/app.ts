import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { ThemeSwitcherComponent } from './components/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ThemeSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /**
   * Palette tester (bottom-right widget). Hidden for now — the site uses the
   * baked-in "Coral & Peach" default. Flip to `true` to bring the switcher
   * back and try other palettes.
   */
  protected readonly showThemeSwitcher = false;
}
