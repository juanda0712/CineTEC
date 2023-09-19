import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { ListingsComponent } from './Components/listings/listings.component';
import { BookingComponent } from './Components/booking/booking.component';
import { ContactComponent } from './Components/contact/contact.component';
import { MovieInfoComponent } from './Components/movie-info/movie-info.component';
import { BookingSpaceComponent } from './Components/booking-space/booking-space.component';
import { ProjectionsComponent } from './Components/projections/projections.component';
import { ClientFormComponent } from './Components/client-form/client-form.component';
import { TheatreComponent } from './Components/theatre/theatre.component';
import { LoginComponent } from './admin-views/login/login.component';
import { AdminPanelComponent } from './admin-views/admin-panel/admin-panel.component';
import { AdminGuard } from './Services/admin-guard';
import { AdminBranchComponent } from './admin-views/admin-branch/admin-branch.component';

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
    title: 'ReservaEspacio',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contacto',
  },
  {
    path: 'movie-info',
    component: MovieInfoComponent,
    title: 'informacion',
  },
  {
    path: 'projections',
    component: ProjectionsComponent,
    title: 'Proyecciones',
  },
  {
    path: 'client-form',
    component: ClientFormComponent,
    title: 'Formulario',
  },
  {
    path: 'theatre',
    component: TheatreComponent,
    title: 'Sala',
  },
  {
    path: 'admin-login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    title: 'Admin Panel',
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/branches',
    component: AdminBranchComponent,
    title: 'Branches',
    canActivate: [AdminGuard],
  },
];
