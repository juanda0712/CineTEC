import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import data from 'src/utils/relations';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-panel.component.html',
  styles: [],
})
export class AdminPanelComponent {
  relaciones = data.relations;
}
