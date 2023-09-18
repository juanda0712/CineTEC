import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-booking-space',
  standalone: true,
  imports: [CommonModule, NavBarComponent, BookingSpaceComponent],
  templateUrl: './booking-space.component.html',
  styles: [
  ]
})

export class BookingSpaceComponent implements OnInit{
  numRows: number = 10; // Número de filas predeterminado
  numCols: number = 10; // Número de columnas predeterminado

  rows: string[] = [];
  cols: number[] = [];

  cellColors: { [key: string]: string } = {};

  constructor() { }

  ngOnInit(): void {
    // Genera un arreglo de letras en orden alfabético (A, B, C, ...)
    this.rows = Array.from({ length: this.numRows }, (_, i) => String.fromCharCode(65 + i));

    // Genera un arreglo de números para las columnas (1, 2, 3, ...)
    this.cols = Array.from({ length: this.numCols }, (_, i) => i + 1);
  }

  cellClicked(row: string, col: number) {
    // Esta función se ejecutará cuando se haga clic en una celda
    console.log(`Celda clickeada: Fila ${row}, Columna ${col}`);

    // Esta función se ejecutará cuando se haga clic en una celda
    console.log(`Celda clickeada: Fila ${row}, Columna ${col}`);
    
    // Cambia el color de fondo de la celda al hacer clic
    const cellKey = row + col;
    this.cellColors[cellKey] = this.cellColors[cellKey] === 'lightblue' ? '' : 'lightblue';

    // Puedes agregar aquí la lógica que desees realizar al hacer clic en una celda
  }
}
