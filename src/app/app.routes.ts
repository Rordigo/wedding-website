import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { GiftsPageComponent } from './pages/gifts-page.component';
import { CheckoutPageComponent } from './pages/checkout-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'presentes', component: GiftsPageComponent },
  { path: 'presentes/checkout', component: CheckoutPageComponent },
  { path: '**', redirectTo: '' },
];
