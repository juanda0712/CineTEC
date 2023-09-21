import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Branch } from 'src/app/Interfaces/branch';
import { Movie } from 'src/app/Interfaces/movie';
import { Projection } from 'src/app/Interfaces/projection';

@Component({
  selector: 'app-admin-projection',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-projection.component.html',
  styles: [],
})
export class AdminProjectionComponent {
  branchList: Branch[] = [];
  movieList: Movie[] = [];
  projectionList: Projection[] = [];
  editMode = false;
  projectionForm: FormGroup;
  filterForm: FormGroup;

  constructor(
    private api1: ApiService<Branch>,
    private api2: ApiService<Movie>,
    private api3: ApiService<Projection>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectionForm = this.fb.group({
      idProyeccion: [0, Validators.required],
      dia: [0, Validators.required],
      mes: [0, Validators.required],
      agno: [0, Validators.required],
      horaInicio: [null, Validators.required],
      horaFin: [null, Validators.required],
      pelicula: ['', Validators.required], // FK (PK de pelicula)
      nombreSucursal: ['', Validators.required], // FK (PK de sucursal)
    });
    this.filterForm = this.fb.group({
      pelicula: ['', Validators.required], // FK (PK de pelicula)
      nombreSucursal: ['', Validators.required], // FK (PK de sucursal)
    });
  }

  ngOnInit(): void {
    // Cargar la lista de películas y sucursales al iniciar
    this.loadMovies();
    this.loadBranches();
  }

  loadMovies(): void {
    this.api2.getAll('Peliculas').subscribe(
      (data: Movie[]) => {
        this.movieList = data;
      },
      (error) => {
        console.error('Error loading movies: ', error);
      }
    );
  }

  loadBranches(): void {
    this.api1.getAll('Sucursal').subscribe(
      (data: Branch[]) => {
        this.branchList = data;
      },
      (error) => {
        console.error('Error loading branches: ', error);
      }
    );
  }

  getProjectionsByMovieAndBranch(): void {
    const selectedMovieControl = this.filterForm.get('pelicula');
    const selectedBranchControl = this.filterForm.get('nombreSucursal');

    if (selectedMovieControl && selectedBranchControl) {
      const selectedMovie: string = selectedMovieControl.value;
      const selectedBranch: string = selectedBranchControl.value;

      if (selectedMovie && selectedBranch) {
        this.api3
          .getByTwoIds('Proyeccion', selectedMovie, selectedBranch)
          .subscribe(
            (data: Projection[]) => {
              this.projectionList = data;
            },
            (error) => {
              console.error('Error loading filtered projections: ', error);
            }
          );
      } else {
        // Si alguno de los dos filtros no está seleccionado, cargar todas las proyecciones
        this.getProjectionsByMovieAndBranch();
      }
    } else {
      // En caso de que los controles sean nulos, manejar la situación adecuadamente
      console.warn('Alguno de los controles de filtro es nulo.');
    }
  }

  createNewProjection() {
    this.editMode = false;
    this.projectionForm.reset();
  }

  editProjection(projection: Projection) {
    this.editMode = true;
    this.projectionForm.patchValue(projection);
  }

  saveProjection() {
    if (this.projectionForm.valid) {
      const newEntity: Projection = this.projectionForm.value;
      const primaryKey = newEntity.idProyeccion;

      if (this.editMode) {
        this.api3.update('Proyeccion', primaryKey, newEntity).subscribe(
          (data) => {
            console.log('Proyeccion actualizada:', data);
            this.getProjectionsByMovieAndBranch(); // Recargar la lista de proyecciones
          },
          (error: any) => {
            console.error('Error al actualizar Proyeccion:', error);
          }
        );
      } else {
        this.api3.create('Proyeccion', newEntity).subscribe(
          (data) => {
            console.log('Nueva Proyeccion creada:', data);
            this.getProjectionsByMovieAndBranch(); // Recargar la lista de proyecciones
          },
          (error: any) => {
            console.error('Error al crear Proyeccion:', error);
          }
        );
      }

      this.createNewProjection();
    }
  }

  deleteProjection(projection: Projection) {
    this.api3.delete('Proyeccion', projection.idProyeccion).subscribe(
      () => {
        console.log('Projection deletion successful');
        this.getProjectionsByMovieAndBranch();
      },
      (error: any) => {
        console.error('Error fetching Projection:', error);
      }
    );
  }
  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
