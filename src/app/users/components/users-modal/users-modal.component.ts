import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-users-modal',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.scss',
})
export class UsersModalComponent {}
