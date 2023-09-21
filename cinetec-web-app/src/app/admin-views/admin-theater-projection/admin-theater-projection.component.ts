import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { Theater } from 'src/app/Interfaces/theater';
import { Projection } from 'src/app/Interfaces/projection';
import { TheaterProjection } from 'src/app/Interfaces/theaterProjection';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-admin-theater-projection',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-theater-projection.component.html',
  styles: [],
})
export class AdminTheaterProjectionComponent {
  theaterList: Theater[] = [];
  projectionList: Projection[] = [];
  theaterProjectionList: TheaterProjection[] = [];
  theaterInfo: Theater | null = null;
  projectionInfo: Projection | null = null;
  theaterProjectionForm: FormGroup;

  constructor(
    private theaterApi: ApiService<Theater>,
    private projectionApi: ApiService<Projection>,
    private theaterProjectionApi: ApiService<TheaterProjection>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.theaterProjectionForm = this.fb.group({
      idSala: [null, Validators.required],
      idProyeccion: [null, Validators.required],
    });

    // Suscribirse a cambios en el formulario para actualizar la información
    this.theaterProjectionForm
      .get('idSala')
      ?.valueChanges.subscribe((selectedSalaId) => {
        // Obtener y asignar la información de la sala seleccionada
        this.theaterInfo =
          this.theaterList.find(
            (theater) => theater.idSala === selectedSalaId
          ) || null;
      });

    this.theaterProjectionForm
      .get('idProyeccion')
      ?.valueChanges.subscribe((selectedProyeccionId) => {
        // Obtener y asignar la información de la proyección seleccionada
        this.projectionInfo =
          this.projectionList.find(
            (projection) => projection.idProyeccion === selectedProyeccionId
          ) || null;
      });
  }

  ngOnInit() {
    this.loadTheaterList();
    this.loadProjectionList();
    this.loadUniosList();
  }

  loadTheaterList() {
    this.theaterApi.getAll('Sala').subscribe(
      (data) => {
        this.theaterList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de salas:', error);
      }
    );
  }

  loadProjectionList() {
    this.projectionApi.getAll('Proyeccion').subscribe(
      (data) => {
        this.projectionList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de proyecciones:', error);
      }
    );
  }

  loadUniosList() {
    this.theaterProjectionApi.getAll('SalaProyeccion').subscribe(
      (data) => {
        this.theaterProjectionList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de uniones:', error);
      }
    );
  }

  saveUnion() {
    const idSalaSeleccionada = this.theaterProjectionForm.get('idSala')?.value;
    const idProyeccionSeleccionada =
      this.theaterProjectionForm.get('idProyeccion')?.value;

    if (idSalaSeleccionada !== null && idProyeccionSeleccionada !== null) {
      // Ambos valores son válidos, procedemos a crear la unión
      const newUnion: TheaterProjection = {
        idSala: idSalaSeleccionada,
        idProyeccion: idProyeccionSeleccionada,
      };

      this.theaterProjectionApi.create('SalaProyeccion', newUnion).subscribe(
        (data) => {
          console.log('Nueva unión creada:', data);
          this.loadUniosList();
        },
        (error: any) => {
          console.error('Error al crear nueva unión:', error);
        }
      );
    } else {
      // Manejar el caso en el que uno o ambos valores sean 'null'
      console.error('Uno o ambos valores son null.');
    }
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
