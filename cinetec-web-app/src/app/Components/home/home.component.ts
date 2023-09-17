import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../Reusables/nav-bar/nav-bar.component';
import { BranchComponent } from 'src/app/Reusables/branch/branch.component';
import { Branch } from 'src/app/Interfaces/branch';
import { BranchService } from 'src/app/Services/branch.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent, BranchComponent],
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  branchList: Branch[] = [];

  constructor(private api: BranchService) {}

  ngOnInit() {
    this.api.getAllBranches().subscribe(
      (branchList: Branch[]) => {
        this.branchList = branchList;
      },
      (error: any) => {
        console.error('Error fetching branch:', error);
      }
    );
  }
}
