import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../user.model';

export interface UserState extends EntityState<User> {}

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
