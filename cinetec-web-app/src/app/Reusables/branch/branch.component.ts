import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Branch } from 'src/app/Interfaces/branch';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch.component.html',
  styles: [],
})
export class BranchComponent {
  @Input() branch!: Branch;
}
