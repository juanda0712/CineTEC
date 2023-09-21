import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { Movie, Movie2 } from 'src/app/Interfaces/movie';
import { ApiService } from 'src/app/Services/api-service';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterOutlet, RouterLink],
  templateUrl: './movie-info.component.html',
  styles: [],
})
export class MovieInfoComponent {
  movie: Movie2[] = [];

  constructor(private api: ApiService<Movie2>, private route: ActivatedRoute) { }

  ngOnInit() {
    //const selectedMovie = localStorage.getItem('originalName');
    const selectedMovie = this.route.snapshot.params['originalName'];
    console.log(selectedMovie);

    this.api.getById('Peliculas', selectedMovie).subscribe(
      (movie: Movie2[]) => {
        this.movie = movie;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }
}
