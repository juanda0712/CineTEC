import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavBarComponent } from './Reusables/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'cinetec-web-app';
}
