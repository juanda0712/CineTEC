import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-booking-space',
  standalone: true,
  imports: [CommonModule,NavBarComponent, BookingSpaceComponent],
  templateUrl: './booking-space.component.html',
  styles: [
  ]
})
export class BookingSpaceComponent {

}
