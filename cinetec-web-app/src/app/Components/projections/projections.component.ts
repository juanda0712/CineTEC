import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { ProjectionsCardComponent } from '../../Reusables/projections-card/projections-card.component';

@Component({
  selector: 'app-projections',
  standalone: true,
  imports: [CommonModule, ProjectionsCardComponent, NavBarComponent],
  templateUrl: './projections.component.html',
  styles: [
  ]
})
export class ProjectionsComponent {

}
