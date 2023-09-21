import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { ProjectionsCardComponent } from '../../Reusables/projections-card/projections-card.component';
import { Projection } from 'src/app/Interfaces/projection';
import { ApiService } from 'src/app/Services/api-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projections',
  standalone: true,
  imports: [CommonModule, ProjectionsCardComponent, NavBarComponent],
  templateUrl: './projections.component.html',
  styles: [
  ]
})
export class ProjectionsComponent {
  projections: Projection[] = [];

  constructor(private api: ApiService<Projection>, private route: ActivatedRoute) { }

  ngOnInit() {
    const branchName = localStorage.getItem("selectedBranch")
    const selectedMovie = this.route.snapshot.params['originalName'];
    console.log(branchName)

    this.api.getByTwoIds('Proyeccion', selectedMovie, branchName).subscribe(
      (data) => {
        console.log(data)
        this.projections = data;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );



  }
}
