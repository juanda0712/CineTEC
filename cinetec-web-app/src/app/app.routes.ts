import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { ListingsComponent } from './Components/listings/listings.component';
import { BookingComponent } from './Components/booking/booking.component';
import { ContactComponent } from './Components/contact/contact.component';
import { MovieInfoComponent } from './Components/movie-info/movie-info.component';
import { BookingSpaceComponent } from './Components/booking-space/booking-space.component';
import { ProjectionsComponent } from './Components/projections/projections.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'listings',
    component: ListingsComponent,
    title: 'Cartelera',
  },
  {
    path: 'booking',
    component: BookingComponent,
    title: 'Reservas',
  },
  {
    path: 'booking-space',
    component: BookingSpaceComponent,
    title: 'ReservaEspacio'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contacto'
  },
  {
    path: 'movie-info',
    component: MovieInfoComponent,
    title: 'informacion'
  },
  {
    path: 'projections',
    component: ProjectionsComponent,
    title: 'Proyecciones'
  }
];
