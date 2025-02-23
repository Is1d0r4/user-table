import { Injectable } from '@angular/core';
import { UserStore } from './users.store';
import { User } from '../user.model';
import { map, Observable, switchMap, take, timer } from 'rxjs';
import { UserQuery } from './users.query';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  addUser(username: string) {
    const newUser: User = {
      id: (this.userStore.getValue().ids?.length ?? 0) + 1,
      name: username,
      active: false,
    };
    this.userStore.add(newUser);
  }

  toggleUserActivity(id: number) {
    this.userStore.update(id, (user) => ({
      ...user,
      active: !user.active,
    }));
  }

  fetchUserNames(): Observable<string[]> {
    const DELAY = 500;
    return timer(DELAY).pipe(
      switchMap(() =>
        this.userQuery.selectAll().pipe(
          take(1),
          map((users) => users.map((user) => user.name))
        )
      )
    );
  }
}
