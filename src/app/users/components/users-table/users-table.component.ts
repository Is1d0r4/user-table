import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserQuery } from '../../state/users.query';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  tableDisplayedColumns: string[] = ['userId', 'name', 'status'];
  tableDataSource = new MatTableDataSource<User>();
  users$?: Observable<User[]>;

  constructor(private userQuery: UserQuery) {}

  ngOnInit(): void {
    this.users$ = this.userQuery.selectAll();
    this.users$.subscribe((users) => {
      this.tableDataSource.data = users;
    });
  }

  onToggleActive(user: User): void {}

  onAddUser(): void {}
}
