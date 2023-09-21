import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service';
import { Bill, Bill2, Seat } from 'src/app/Interfaces/bill';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-admin-bill',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-bill.component.html',
  styles: [],
})
export class AdminBillComponent {
  billList: Bill[] = [];
  editMode = false;
  billForm: FormGroup;
  seatForm: FormGroup;

  constructor(
    private BillApi: ApiService<Bill>,
    private Bill2Api: ApiService<Bill2>,
    private SeatApi: ApiService<Seat>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.billForm = this.fb.group({
      idFactura: [null, [Validators.required]],
      cedulaCliente: ['', [Validators.required]],
      nombreSucursal: ['', [Validators.required]],
      idProyeccion: [null, [Validators.required]],
      idSala: [null, [Validators.required]],
      impuesto: [0, [Validators.required]],
      monto: [0, [Validators.required]],
      fecha: [null, [Validators.required]],
      seats: this.fb.array([]), // Initialize as an empty FormArray for seats
    });
    this.seatForm = this.fb.group({
      // Initialize as an empty FormArray for seats
    });
  }

  ngOnInit() {
    this.updateList();
  }

  private updateList() {
    this.BillApi.getAll('Factura').subscribe(
      (data) => {
        this.billList = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de facturas:', error);
      }
    );
  }

  createNew() {
    this.editMode = false;
    this.billForm.reset();
  }

  get seats() {
    return this.billForm.get('seats') as FormArray;
  }

  addSeat() {
    this.seats.push(this.fb.control(0)); // Agregamos un nuevo control con valor 0
  }

  edit(bill: Bill) {
    this.editMode = true;
    this.billForm.patchValue(bill);
  }

  save() {
    if (this.billForm.valid) {
      const newBill: Bill2 = this.billForm.value; // Use the Bill2 interface for saving bills
      const primaryKey = newBill.idFactura;

      if (this.editMode) {
        // Update an existing bill
        this.Bill2Api.update('Factura', primaryKey, newBill).subscribe(
          (data) => {
            console.log('Factura actualizada:', data);
            this.updateList();
          },
          (error: any) => {
            console.error('Error al actualizar factura:', error);
          }
        );
      } else {
        // Create a new bill
        this.Bill2Api.create('Factura', newBill).subscribe(
          (data) => {
            console.log('Nueva factura creada:', data);
            this.updateList();
          },
          (error: any) => {
            console.error('Error al crear factura:', error);
          }
        );
      }
      const seatsFormArray = this.billForm.get('seats');
      if (seatsFormArray) {
        const seatList: Seat[] = [];
        const seatsToSave = seatsFormArray.value;

        const idSalaControl = this.billForm.get('idSala');
        const idProyeccionControl = this.billForm.get('idProyeccion');
        const idFacturaControl = this.billForm.get('idFactura');

        if (idSalaControl && idProyeccionControl && idFacturaControl) {
          seatsToSave.forEach((seatNumber: number) => {
            const seat: Seat = {
              numero: seatNumber,
              estado: 'ocupado',
              idSala: idSalaControl.value,
              idProyeccion: idProyeccionControl.value,
              idFactura: idFacturaControl.value,
            };
            seatList.push(seat);
          });
        } else {
          console.error('Alguno de los controles es nulo');
        }
        this.SeatApi.createList('Asiento', seatList).subscribe(
          (seatData) => {
            console.log('Asientos guardados:', seatData);
            this.createNew();
          },
          (seatError: any) => {
            console.error('Error al guardar seats:', seatError);
          }
        );
      } else {
        console.log('El arrayForm es nulo');
      }
    }
  }

  deleteEntity(bill: Bill) {
    this.BillApi.delete('Factura', bill.idFactura).subscribe(
      () => {
        console.log('Factura eliminada con éxito');
        this.updateList();
      },
      (error: any) => {
        console.error('Error al eliminar factura:', error);
      }
    );
    this.SeatApi.delete('Asiento', bill.idFactura).subscribe(
      () => {
        console.log('Asientos eliminados con éxito');
        this.updateList();
      },
      (error: any) => {
        console.error('Error al eliminar Asientos:', error);
      }
    );
  }

  returnBack() {
    this.router.navigate(['/admin-panel']);
  }
}
