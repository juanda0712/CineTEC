import { Routes } from '@angular/router';
import { BootstrapTestComponent } from 'src/views/bootstrap-test/bootstrap-test.component';
import { HomeComponent } from 'src/views/bootstrap-test/home.component';

export const routes: Routes = [
  {
    path: '', redirectTo: "/home", pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'bootstrap',
    component: BootstrapTestComponent,
    title: 'Bootstrap',
  },
];
