import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero.component';
import { StoryComponent } from '../components/story.component';
import { DetailsComponent } from '../components/details.component';
import { ScheduleComponent } from '../components/schedule.component';
import { PhotoBandComponent } from '../components/photo-band.component';
import { TravelComponent } from '../components/travel.component';
import { RegistryComponent } from '../components/registry.component';
import { RsvpComponent } from '../components/rsvp.component';
import { FaqComponent } from '../components/faq.component';
import { siteConfig } from '../site-config';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    StoryComponent,
    DetailsComponent,
    ScheduleComponent,
    PhotoBandComponent,
    TravelComponent,
    RegistryComponent,
    RsvpComponent,
    FaqComponent,
  ],
  template: `
    <app-hero />
    <app-photo-band [images]="cfg.photoBands[0]" />
    <app-story />
    <app-photo-band [images]="cfg.photoBands[1]" />
    <app-details />
    <app-photo-band [images]="cfg.photoBands[2]" />
    <app-schedule />
    <app-photo-band [images]="cfg.photoBands[3]" />
    <app-travel />
    <app-photo-band [images]="cfg.photoBands[4]" />
    <app-registry />
    <app-photo-band [images]="cfg.photoBands[5]" />
    <app-rsvp />
    <app-photo-band [images]="cfg.photoBands[6]" />
    <app-faq />
  `,
})
export class HomePageComponent {
  readonly cfg = siteConfig;
}
