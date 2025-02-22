import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users/components/users-table/users-table.component';
import { UserQuery } from './users/state/users.query';
import { UserStore } from './users/state/users.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UsersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UserQuery, UserStore],
})
export class AppComponent {}
