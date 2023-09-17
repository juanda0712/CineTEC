import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchComponent } from 'src/app/Reusables/branch/branch.component';
import { Branch } from 'src/app/Interfaces/branch';
import { ApiService } from 'src/app/Services/api-service.';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BranchComponent],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  branchList: Branch[] = [];

  constructor(private api: ApiService<Branch>) {}

  ngOnInit() {
    this.api.getAll('Sucursal').subscribe(
      (data) => {
        this.branchList = data;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }
}
