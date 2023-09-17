import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../Reusables/movie-card/movie-card.component';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './listings.component.html',
  styles: [],
})
export class ListingsComponent {}
