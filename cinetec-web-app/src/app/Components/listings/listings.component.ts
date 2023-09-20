import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../Reusables/movie-card/movie-card.component';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { Movie } from 'src/app/Interfaces/movie';
import { ApiService } from 'src/app/Services/api-service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NavBarComponent],
  templateUrl: './listings.component.html',
  styles: [],
})
export class ListingsComponent {
  movieList: Movie[] = [];

  constructor(private api: ApiService<Movie>) { }

  ngOnInit() {
    const branchName = localStorage.getItem("selectedBranch")
    this.api.GetMovieByBranch(branchName!).subscribe(
      (data) => {
        this.movieList = data;
      },
      (error: any) => {
        console.error('Error fetching movie:', error);
      }
    );
  }
}
