import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../user.model';
import { Injectable } from '@angular/core';

export interface UserState extends EntityState<User> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();
    this.setInitialState();
  }

  setInitialState() {
    const initialUsers: User[] = [
      { id: 1, name: 'Isidora', active: true },
      { id: 2, name: 'Nikita', active: false },
    ];
    this.set(initialUsers);
  }
}
