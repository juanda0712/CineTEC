import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/Interfaces/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styles: [],
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}
  OnClick() {
    console.log('hola');

    localStorage.setItem('selectedMovie', this.movie.nombreOriginal);
    this.router.navigate(['/movie-info', this.movie.nombreOriginal]);
    //window.location.href = `movie-info/${this.movie.nombreOriginal}`;
  }
}
