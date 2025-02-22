import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../user.model';
import { Observable, Subscription } from 'rxjs';
import { UserQuery } from '../../state/users.query';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../state/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersModalComponent } from '../users-modal/users-modal.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  animations: [],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  readonly modal = inject(MatDialog);

  tableDisplayedColumns: string[] = ['userId', 'name', 'status'];
  tableDataSource = new MatTableDataSource<User>();
  users$?: Observable<User[]>;
  subscription?: Subscription = new Subscription();

  constructor(private userQuery: UserQuery, private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userQuery.selectAll();
    this.subscription?.add(
      this.users$.subscribe((users) => {
        this.tableDataSource.data = users;
        console.log(users);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onToggleActive(user: User): void {
    this.userService.toggleUserStatus(user.id);
  }

  onOpenModal(): void {
    this.modal.open(UsersModalComponent);
  }
}
