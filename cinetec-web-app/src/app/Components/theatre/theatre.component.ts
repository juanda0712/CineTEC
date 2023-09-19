import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './theatre.component.html',
  styles: [
  ]
})
export class TheatreComponent {

}