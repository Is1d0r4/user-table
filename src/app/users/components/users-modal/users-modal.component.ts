import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../state/users.service';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../shared/validators/custom.validators';

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
export class UsersModalComponent {
  nameForm!: FormGroup;
  readonly modal = inject(MatDialogRef<UsersModalComponent>);

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createUsernameForm();
  }

  createUsernameForm() {
    this.nameForm = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [
            CustomValidators.uniqueUsernameValidator(this.userService),
          ],
          updateOn: 'change',
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.nameForm?.valid) {
      this.userService.addUser(this.nameForm?.value.name);
    }
    this.modal.close();
  }
}
