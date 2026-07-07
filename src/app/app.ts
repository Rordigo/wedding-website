import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { StoryComponent } from './components/story.component';
import { DetailsComponent } from './components/details.component';
import { ScheduleComponent } from './components/schedule.component';
import { GalleryComponent } from './components/gallery.component';
import { TravelComponent } from './components/travel.component';
import { RegistryComponent } from './components/registry.component';
import { RsvpComponent } from './components/rsvp.component';
import { FaqComponent } from './components/faq.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    StoryComponent,
    DetailsComponent,
    ScheduleComponent,
    GalleryComponent,
    TravelComponent,
    RegistryComponent,
    RsvpComponent,
    FaqComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
