import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { ListingsComponent } from './Components/listings/listings.component';
import { BookingComponent } from './Components/booking/booking.component';
import { ContactComponent } from './Components/contact/contact.component';

export const routes: Routes = [
  {
    path: '', redirectTo: "/home", pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'listings',
    component: ListingsComponent,
    title: 'Cartelera'
  },
  {
    path: 'booking',
    component: BookingComponent,
    title: 'Reservas'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact'
  }
];
