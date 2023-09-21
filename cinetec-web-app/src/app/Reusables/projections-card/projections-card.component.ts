import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projection } from 'src/app/Interfaces/projection';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projections-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './projections-card.component.html',
  styles: [
  ]
})
export class ProjectionsCardComponent {
  @Input() projection!: Projection;

  constructor(private router: Router) { }
  OnClick() {

    //localStorage.setItem('selectedProjection', this.projection.idProyeccion);
    this.router.navigate(['/projection', this.projection.idProyeccion]);
    //window.location.href = `movie-info/${this.movie.nombreOriginal}`;
  }

}
