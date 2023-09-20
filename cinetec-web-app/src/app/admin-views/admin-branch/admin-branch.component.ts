import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { Branch } from 'src/app/Interfaces/branch';
import { ApiService } from 'src/app/Services/api-service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-admin-branch',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-branch.component.html',
  styles: [],
})
export class AdminBranchComponent {
  sucursales: Branch[] = [];
  modoEdicion = false;
  sucursalForm: FormGroup;

  constructor(private api: ApiService<Branch>, private fb: FormBuilder) {
    this.sucursalForm = this.fb.group({
      nombre: [''],
      ubicacion: ['', Validators.required],
      numeroSalas: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.actualizarListaSucursales();
  }

  private actualizarListaSucursales() {
    this.api.getAll('Sucursal').subscribe(
      (data) => {
        this.sucursales = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de sucursales:', error);
      }
    );
  }

  crearNuevaSucursal() {
    this.modoEdicion = false;
    this.sucursalForm.reset();
  }

  editarSucursal(sucursal: Branch) {
    this.modoEdicion = true;
    this.sucursalForm.setValue({
      nombre: sucursal.nombre,
      ubicacion: sucursal.ubicacion,
      numeroSalas: sucursal.numeroSalas,
    });
  }

  guardarSucursal() {
    if (this.sucursalForm.valid) {
      const nuevaSucursal: Branch = this.sucursalForm.value;
      const branchName = nuevaSucursal.nombre;

      if (this.modoEdicion) {
        // Si estamos en modo edición, utiliza el endpoint de actualización
        this.api.update('Sucursal', branchName, nuevaSucursal).subscribe(
          (data) => {
            console.log('Sucursal actualizada:', data);
            this.actualizarListaSucursales();
          },
          (error: any) => {
            console.error('Error al actualizar sucursal:', error);
          }
        );
      } else {
        // Si no estamos en modo edición, crea una nueva sucursal
        this.api.create('Sucursal', nuevaSucursal).subscribe(
          (data) => {
            console.log('Nueva sucursal creada:', data);
            this.actualizarListaSucursales();
          },
          (error: any) => {
            console.error('Error al crear nueva sucursal:', error);
          }
        );
      }

      this.crearNuevaSucursal();
    }
  }

  eliminarSucursal(sucursal: Branch) {
    this.api.delete('Sucursal', sucursal.nombre).subscribe(
      () => {
        console.log('branch deletion successful');
        this.actualizarListaSucursales();
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }
}
