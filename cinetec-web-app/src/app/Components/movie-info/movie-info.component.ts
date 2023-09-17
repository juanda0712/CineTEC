import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './movie-info.component.html',
  styles: [
  ]
})
export class MovieInfoComponent {

}
