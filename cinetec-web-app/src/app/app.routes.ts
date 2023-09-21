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
import { AdminTheaterComponent } from './admin-views/admin-theater/admin-theater.component';
import { AdminClientComponent } from './admin-views/admin-client/admin-client.component';
import { AdminMovieComponent } from './admin-views/admin-movie/admin-movie.component';
import { AdminProjectionComponent } from './admin-views/admin-projection/admin-projection.component';
import { AdminBillComponent } from './admin-views/admin-bill/admin-bill.component';
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
    path: 'movie-info/:originalName',
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
  {
    path: 'admin/theater',
    component: AdminTheaterComponent,
    title: 'Theaters',
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/clients',
    component: AdminClientComponent,
    title: 'Clients',
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/movies',
    component: AdminMovieComponent,
    title: 'Movies',
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/projections',
    component: AdminProjectionComponent,
    title: 'Projections',
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/bills',
    component: AdminBillComponent,
    title: 'Bills',
    canActivate: [AdminGuard],
  },
];
