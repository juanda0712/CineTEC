import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { Client } from 'src/app/Interfaces/client';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-admin-client',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-client.component.html',
  styles: [],
})
export class AdminClientComponent {
  clientList: Client[] = [];
  editMode = false;
  clientForm: FormGroup;

  constructor(
    private api: ApiService<Client>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      cedula: ['', Validators.required], // Agrega las validaciones que necesites
      nombre: ['', Validators.required],
      fechaNacimiento: [null, Validators.required], // Asegúrate de importar Validators si aún no lo has hecho
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.updateList();
  }

  private updateList() {
    this.api.getAll('Client').subscribe(
      (data) => {
        this.clientList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de clientes:', error);
      }
    );
  }

  createNew() {
    this.editMode = false;
    this.clientForm.reset();
  }

  edit(client: Client) {
    this.editMode = true;
    this.clientForm.setValue({
      cedula: client.cedula,
      nombre: client.nombre,
      fechaNacimiento: client.fechaNacimiento,
      telefono: client.telefono,
      correo: client.correo,
    });
  }

  save() {
    if (this.clientForm.valid) {
      const newEntity: Client = this.clientForm.value;
      const primaryKey = newEntity.cedula;

      if (this.editMode) {
        // Si estamos en modo edición, utiliza el endpoint de actualización
        this.api.update('Client', primaryKey, newEntity).subscribe(
          (data) => {
            console.log('Cliente actualizado:', data);
            this.updateList();
          },
          (error: any) => {
            console.error('Error al actualizar cliente:', error);
          }
        );
      } else {
        // Si no estamos en modo edición, crea una nueva sucursal
        this.api.create('Client', newEntity).subscribe(
          (data) => {
            console.log('Nuevo cliente creado:', data);
            this.updateList();
          },
          (error: any) => {
            console.error('Error al crear cliente:', error);
          }
        );
      }

      this.createNew();
    }
  }

  deleteEntity(client: Client) {
    this.api.delete('Client', client.cedula).subscribe(
      () => {
        console.log('client deletion successful');
        this.updateList();
      },
      (error: any) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
