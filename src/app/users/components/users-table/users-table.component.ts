import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  users: Array<User> = [
    { id: 1, name: 'John', active: true },
    { id: 2, name: 'Isidora', active: false },
  ];

  toggleActive(user: User): void {
    user.active = !user.active;
  }

  onAddUser(): void {
    //openModal
    this.users.push({ id: this.users.length + 1, name: 'New User' });
  }
}
