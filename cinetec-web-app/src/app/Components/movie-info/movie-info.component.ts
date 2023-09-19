import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { Movie } from 'src/app/Interfaces/movie';
import { ApiService } from 'src/app/Services/api-service';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './movie-info.component.html',
  styles: [
  ]
})
export class MovieInfoComponent {
  @Input() movie!: Movie;

  constructor(private api: ApiService<Movie>) { }

  ngOnInit() {
    const selectedMovie = localStorage.getItem("selectedMovie");
    console.log(selectedMovie);

    this.api.getById(selectedMovie!, 'Pelicula').subscribe(
      (movie: Movie) => {
        this.movie = movie;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }


}
