import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

}