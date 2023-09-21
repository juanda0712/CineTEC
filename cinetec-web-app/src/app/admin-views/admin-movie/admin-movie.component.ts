import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { Actor } from 'src/app/Interfaces/actor';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Movie } from 'src/app/Interfaces/movie';

@Component({
  selector: 'app-admin-movie',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-movie.component.html',
  styles: [],
})
export class AdminMovieComponent {
  movieList: Movie[] = [];
  actorList: Actor[] = [];
  editMode = false;
  movieForm: FormGroup;
  actorForm: FormGroup;

  constructor(
    private movieApi: ApiService<Movie>,
    private actorApi: ApiService<Actor>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      nombreOriginal: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      imagen: ['', Validators.required],
      director: ['', Validators.required],
      clasificacion: ['', Validators.required],
      duracion: [0, Validators.required],
    });

    this.actorForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      nombreOriginal: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateLists();
  }

  private updateLists() {
    this.movieApi.getAll('Peliculas').subscribe(
      (data) => {
        this.movieList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de películas:', error);
      }
    );
    this.actorApi.getAll('Protagonista').subscribe(
      (data) => {
        this.actorList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de actores:', error);
      }
    );
  }

  createNewMovie() {
    this.editMode = false;
    this.movieForm.reset();
  }

  createNewActor() {
    this.editMode = false;
    this.actorForm.reset();
  }
  editMovie(movie: Movie) {
    this.editMode = true;
    this.movieForm.setValue({
      nombreOriginal: movie.nombreOriginal,
      nombreComercial: movie.nombreComercial,
      imagen: movie.imagen,
      director: movie.director,
      clasificacion: movie.clasificacion,
      duracion: movie.duracion,
    });
  }

  saveMovie() {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value;

      if (this.editMode) {
        this.movieApi
          .update('Peliculas', newMovie.nombreOriginal, newMovie)
          .subscribe(
            (data) => {
              console.log('Película actualizada:', data);
              this.updateLists();
            },
            (error: any) => {
              console.error('Error al actualizar película:', error);
            }
          );
      } else {
        this.movieApi.create('Peliculas', newMovie).subscribe(
          (data) => {
            console.log('Nueva película creada:', data);
            this.updateLists();
          },
          (error: any) => {
            console.error('Error al crear película:', error);
          }
        );
      }

      this.createNewMovie();
    }
  }

  saveActor() {
    if (this.actorForm.valid) {
      const newActor: Actor = this.actorForm.value;

      this.actorApi.create('Protagonista', newActor).subscribe(
        (data) => {
          console.log('Nuevo actor creado:', data);
          this.updateLists();
        },
        (error: any) => {
          console.error('Error al crear actor:', error);
        }
      );

      this.createNewActor();
    }
  }

  deleteMovie(movie: Movie) {
    this.movieApi.delete('Peliculas', movie.nombreOriginal).subscribe(
      () => {
        console.log('Película eliminada con éxito');
        this.updateLists();
      },
      (error: any) => {
        console.error('Error al eliminar película:', error);
      }
    );
  }

  deleteActor(actor: Actor) {
    this.actorApi
      .deleteByTwoIds(
        'Protagonista',
        actor.nombreOriginal,
        actor.nombreCompleto
      )
      .subscribe(
        () => {
          console.log('Actor eliminado con éxito');
          this.updateLists();
        },
        (error: any) => {
          console.error('Error al eliminar actor:', error);
        }
      );
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
