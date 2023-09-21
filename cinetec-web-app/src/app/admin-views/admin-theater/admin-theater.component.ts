import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import { Theater } from 'src/app/Interfaces/theater';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Branch } from 'src/app/Interfaces/branch';

@Component({
  selector: 'app-admin-theater',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-theater.component.html',
  styles: [],
})
export class AdminTheaterComponent {
  theaterList: Theater[] = [];
  branchList: Branch[] = [];
  editMode = false;
  theaterForm: FormGroup;

  constructor(
    private api: ApiService<Theater>,
    private auxapi: ApiService<Branch>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.theaterForm = this.fb.group({
      idSala: [null],
      numFilas: [null, Validators.required],
      numColumnas: [null, Validators.required],
      nombreSucursal: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateTheaterList();
  }

  private updateTheaterList() {
    this.api.getAll('Sala').subscribe(
      (data) => {
        this.theaterList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de salas:', error);
      }
    );
    this.auxapi.getAll('Sucursal').subscribe(
      (data) => {
        this.branchList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de sucursales:', error);
      }
    );
  }

  createNewTheater() {
    this.editMode = false;
    this.theaterForm.reset();
  }

  editTheater(theater: Theater) {
    this.editMode = true;
    this.theaterForm.setValue({
      idSala: theater.idSala,
      numFilas: theater.numFilas,
      numColumnas: theater.numColumnas,
      nombreSucursal: theater.nombreSucursal,
    });
  }

  saveTheater() {
    if (this.theaterForm.valid) {
      const newTheater: Theater = this.theaterForm.value;
      const idTheater = newTheater.idSala;

      if (this.editMode) {
        // Si estamos en modo edición, utiliza el endpoint de actualización
        this.api.update('Sala', idTheater, newTheater).subscribe(
          (data) => {
            console.log('Sala actualizada:', data);
            this.updateTheaterList();
          },
          (error: any) => {
            console.error('Error al actualizar sala:', error);
          }
        );
      } else {
        // Si no estamos en modo edición, crea una nueva sucursal
        this.api.create('Sala', newTheater).subscribe(
          (data) => {
            console.log('Nueva sala creada:', data);
            this.updateTheaterList();
          },
          (error: any) => {
            console.error('Error al crear nueva sala:', error);
          }
        );
      }

      this.createNewTheater();
    }
  }

  deleteTheater(theater: Theater) {
    this.api.delete('Sala', theater.idSala).subscribe(
      () => {
        console.log('theater deletion successful');
        this.updateTheaterList();
      },
      (error: any) => {
        console.error('Error fetching theater:', error);
      }
    );
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
