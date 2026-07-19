import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero.component';
import { StoryComponent } from '../components/story.component';
import { DetailsComponent } from '../components/details.component';
import { ScheduleComponent } from '../components/schedule.component';
import { GalleryComponent } from '../components/gallery.component';
import { TravelComponent } from '../components/travel.component';
import { RegistryComponent } from '../components/registry.component';
import { RsvpComponent } from '../components/rsvp.component';
import { FaqComponent } from '../components/faq.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    StoryComponent,
    DetailsComponent,
    ScheduleComponent,
    GalleryComponent,
    TravelComponent,
    RegistryComponent,
    RsvpComponent,
    FaqComponent,
  ],
  template: `
    <app-hero />
    <app-story />
    <app-details />
    <app-schedule />
    <app-gallery />
    <app-travel />
    <app-registry />
    <app-rsvp />
    <app-faq />
  `,
})
export class HomePageComponent {}
