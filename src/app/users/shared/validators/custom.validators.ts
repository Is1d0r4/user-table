import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../../state/users.service';
import { map, Observable } from 'rxjs';

export class CustomValidators {
  static uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .fetchUserNames()
        .pipe(
          map((usernames) =>
            usernames.includes(control.value) ? { usernameTaken: true } : null
          )
        );
    };
  }
}
