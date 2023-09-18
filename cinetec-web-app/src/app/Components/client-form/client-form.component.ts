// Importa el servicio
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './client-form.component.html',
  styles: [
  ]
})
export class ClientFormComponent {

}

