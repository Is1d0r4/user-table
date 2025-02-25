import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../state/users.service';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { Subscription } from 'rxjs';
import { CustomErrorStateMatcher } from '../../custom-error-state.matcher';

@Component({
  selector: 'app-users-modal',
  templateUrl: 'users-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class UsersModalComponent implements OnDestroy {
  customMatcher = new CustomErrorStateMatcher();
  subscription = new Subscription();
  nameInput = new FormControl(
    '',
    Validators.required,
    CustomValidators.uniqueUsernameValidator(this.userService)
  );

  constructor(
    private userService: UserService,
    private modal: MatDialogRef<UsersModalComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription.add(
      this.nameInput.statusChanges.subscribe(() => {
        if (!this.nameInput.pending) {
          this.cdr.markForCheck();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.nameInput.value && this.nameInput.valid) {
      this.userService.addUser(this.nameInput.value);
    }
    this.modal.close();
  }
}
