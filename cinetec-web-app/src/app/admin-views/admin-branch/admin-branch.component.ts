import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { Branch } from 'src/app/Interfaces/branch';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
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
  branchList: Branch[] = [];
  editMode = false;
  branchForm: FormGroup;

  constructor(
    private api: ApiService<Branch>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.branchForm = this.fb.group({
      nombre: [''],
      ubicacion: ['', Validators.required],
      numeroSalas: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.updateBranchList();
  }

  private updateBranchList() {
    this.api.getAll('Sucursal').subscribe(
      (data) => {
        this.branchList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de sucursales:', error);
      }
    );
  }

  createNewBranch() {
    this.editMode = false;
    this.branchForm.reset();
  }

  editBranch(branch: Branch) {
    this.editMode = true;
    this.branchForm.setValue({
      nombre: branch.nombre,
      ubicacion: branch.ubicacion,
      numeroSalas: branch.numeroSalas,
    });
  }

  saveBranch() {
    if (this.branchForm.valid) {
      const newBranch: Branch = this.branchForm.value;
      const branchName = newBranch.nombre;

      if (this.editMode) {
        // Si estamos en modo edición, utiliza el endpoint de actualización
        this.api.update('Sucursal', branchName, newBranch).subscribe(
          (data) => {
            console.log('Sucursal actualizada:', data);
            this.updateBranchList();
          },
          (error: any) => {
            console.error('Error al actualizar sucursal:', error);
          }
        );
      } else {
        // Si no estamos en modo edición, crea una nueva sucursal
        this.api.create('Sucursal', newBranch).subscribe(
          (data) => {
            console.log('Nueva sucursal creada:', data);
            this.updateBranchList();
          },
          (error: any) => {
            console.error('Error al crear nueva sucursal:', error);
          }
        );
      }

      this.createNewBranch();
    }
  }

  deleteBranch(branch: Branch) {
    this.api.delete('Sucursal', branch.nombre).subscribe(
      () => {
        console.log('branch deletion successful');
        this.updateBranchList();
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
