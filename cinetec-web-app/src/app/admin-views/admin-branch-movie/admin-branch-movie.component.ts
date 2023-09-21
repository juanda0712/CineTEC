import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import { Branch } from 'src/app/Interfaces/branch';
import { Movie2 } from 'src/app/Interfaces/movie';
import { BranchMovie } from 'src/app/Interfaces/branchMovie';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-admin-branch-movie',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-branch-movie.component.html',
  styles: [],
})
export class AdminBranchMovieComponent {
  branchList: Branch[] = [];
  movieList: Movie2[] = [];
  branchMovieList: BranchMovie[] = [];
  branchMovieForm: FormGroup;
  branchInfo: Branch | null = null;
  movieInfo: Movie2 | null = null;

  constructor(
    private branchApi: ApiService<Branch>,
    private movieApi: ApiService<Movie2>,
    private branchMovieApi: ApiService<BranchMovie>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.branchMovieForm = this.fb.group({
      nombrePelicula: ['', Validators.required],
      nombreSucursal: ['', Validators.required],
    });
    // Suscribirse a cambios en el formulario para actualizar la información
    this.branchMovieForm
      .get('nombrePelicula')
      ?.valueChanges.subscribe((nombreSucursal) => {
        // Obtener y asignar la información de la sala seleccionada
        this.branchInfo =
          this.branchList.find((branch) => branch.nombre === nombreSucursal) ||
          null;
      });

    this.branchMovieForm
      .get('nombreSucursal')
      ?.valueChanges.subscribe((nombreSucursal) => {
        // Obtener y asignar la información de la proyección seleccionada
        this.movieInfo =
          this.movieList.find(
            (movie) => movie.nombreOriginal === nombreSucursal
          ) || null;
      });
  }

  ngOnInit() {
    this.loadBranchList();
    this.loadMovieList();
    this.loadUniosList();
  }

  loadBranchList() {
    this.branchApi.getAll('Sucursal').subscribe(
      (data: Branch[]) => {
        this.branchList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de sucursales:', error);
      }
    );
  }

  loadMovieList() {
    this.movieApi.getAll('Peliculas').subscribe(
      (data: Movie2[]) => {
        this.movieList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de las peliculas:', error);
      }
    );
  }

  loadUniosList() {
    this.branchMovieApi.getAll('SucursalPelicula').subscribe(
      (data: BranchMovie[]) => {
        this.branchMovieList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de uniones:', error);
      }
    );
  }

  saveUnion() {
    const nombrePelicula = this.branchMovieForm.get('nombrePelicula')?.value;
    const nombreSucursal = this.branchMovieForm.get('nombreSucursal')?.value;

    if (nombrePelicula !== null && nombreSucursal !== null) {
      const newUnion: BranchMovie = {
        nombrePelicula: nombrePelicula,
        nombreSucursal: nombreSucursal,
      };

      this.branchMovieApi.create('SucursalPelicula', newUnion).subscribe(
        (data: any) => {
          console.log('Nueva unión creada:', data);
          this.loadUniosList();
        },
        (error: any) => {
          console.error('Error al crear nueva unión:', error);
        }
      );
    } else {
      console.error('Uno o ambos valores son null.');
    }
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
