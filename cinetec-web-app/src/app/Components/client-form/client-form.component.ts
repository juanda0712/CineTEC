// Importa el servicio
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { Client } from 'src/app/Interfaces/client';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api-service';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './client-form.component.html',
  styles: [
  ]
})
export class ClientFormComponent {
  client: Client[] = [];
  clientInfo: string = '';

  constructor(private api: ApiService<Client>, private route: ActivatedRoute) { }

  ngOnInit() {
    //const clientInfo = localStorage.getItem('originalName');
    this.clientInfo = this.route.snapshot.params['selectedSeats'];

    /**this.api.getById('Asiento', clientInfo).subscribe(
      (client: Client[]) => {
        this.client = client;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );**/
  }

}

