import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { TheatreP } from 'src/app/Interfaces/theatrep';
import { ApiService } from 'src/app/Services/api-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './theatre.component.html',
  styles: [
  ]
})
export class TheatreComponent {
  theatres: TheatreP[] = [];

  constructor(private api: ApiService<TheatreP>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const selectedProjection = this.route.snapshot.params['idProyeccion'];
    console.log(selectedProjection);

    this.api.getById('SalaProyeccion', selectedProjection).subscribe(
      (theatres: TheatreP[]) => {
        this.theatres = theatres;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }

  opcionSeleccionada: string = '';

  onSelectChange() {
    // El valor seleccionado estará en this.opcionSeleccionada
    console.log('Valor seleccionado:', this.opcionSeleccionada);
  }

  /** @Input() theatre!: TheatreP;
   OnClick() {
     this.router.navigate(['/movie-info', this.theatre.idSala]);
   }**/

}