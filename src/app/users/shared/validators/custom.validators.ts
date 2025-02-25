import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../../state/users.service';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';

export class CustomValidators {
  static uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const DELAY = 300;
      return of(control.value).pipe(
        debounceTime(DELAY),
        switchMap(() => {
          return userService
            .fetchUserNames()
            .pipe(
              map((usernames) =>
                usernames.includes(control.value)
                  ? { usernameTaken: true }
                  : null
              )
            );
        })
      );
    };
  }
}
