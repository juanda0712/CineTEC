import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NavBarComponent],
  templateUrl: './listings.component.html',
  styles: [],
})
export class ListingsComponent {}
