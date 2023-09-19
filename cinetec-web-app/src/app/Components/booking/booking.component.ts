import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './booking.component.html',
  styles: [
  ]
})
export class BookingComponent {

}
