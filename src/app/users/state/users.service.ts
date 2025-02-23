// src/app/state/user.service.ts
import { Injectable } from '@angular/core';
import { UserStore } from './users.store';
import { User } from '../user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore) {}

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
}
