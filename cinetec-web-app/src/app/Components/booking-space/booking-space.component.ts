import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { Theatre } from 'src/app/Interfaces/theatre';
import { ApiService } from 'src/app/Services/api-service';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-space',
  standalone: true,
  imports: [CommonModule, NavBarComponent, BookingSpaceComponent, RouterOutlet, RouterLink],
  templateUrl: './booking-space.component.html',
  styles: [
  ]
})

export class BookingSpaceComponent implements OnInit {
  selectedSeats: string[] = [];

  cellColors: { [key: string]: string } = {};

  theatre: Theatre[] = [];

  constructor(private api: ApiService<Theatre>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Genera un arreglo de letras en orden alfabético (A, B, C, ...)
    this.rows = Array.from({ length: this.numRows }, (_, i) => String.fromCharCode(65 + i));

    // Genera un arreglo de números para las columnas (1, 2, 3, ...)
    this.cols = Array.from({ length: this.numCols }, (_, i) => i + 1);

    const selectedTheatre = this.route.snapshot.params['idSala'];
    console.log(selectedTheatre);

    this.api.getById('Sala', selectedTheatre).subscribe(
      (theatre: Theatre[]) => {
        this.theatre = theatre;
        this.selectedSeats = this.selectedSeats;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }

  numRows: number = 10; // Número de filas predeterminado
  numCols: number = 10; // Número de columnas predeterminado

  rows: string[] = [];
  cols: number[] = [];

  cellClicked(row: string, col: number) {
    console.log(`Celda clickeada: Fila ${row}, Columna ${col}`);

    const cellKey = row + col;
    this.cellColors[cellKey] = this.cellColors[cellKey] === '#f6d55c' ? '' : '#f6d55c';


    //Guardar los asientos seleccionados
    const asiento = `${row}-${col}`;

    // Verificar si el asiento ya ha sido seleccionado visualmente
    const isSelected = this.cellColors[asiento] === '#f6d55c';

    if (isSelected) {
      // Si el asiento está seleccionado visualmente, guardarlo
      if (!this.selectedSeats.includes(asiento)) {
        this.selectedSeats.push(asiento);
      }
    } else {
      // Si el asiento no está seleccionado visualmente, eliminarlo si existe
      const index = this.selectedSeats.indexOf(asiento);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  /**  @Input() selectedTheatre!: Theatre;
    OnClick() {
      this.router.navigate(['/client-form', this.selectedSeats]);
    }**/
}
