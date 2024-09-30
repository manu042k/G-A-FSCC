import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { User } from 'src/app/constants/user.interface';
/**
 *
 *
 * @export
 * @class RegisterComponent
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private registerService = inject(RegisterService);
  registerForm: FormGroup;
  showPassword: boolean = false;
  private router = inject(Router);
  message: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.maxLength(10)]],
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(30)]],
      profile_pic: [null],
      street_address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  /**
   *
   *
   * @param {*} event
   * @memberof RegisterComponent
   */
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.registerForm.patchValue({ profile_pic: file });
  }
  /**
   *
   *
   * @memberof RegisterComponent
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  /**
   *
   *
   * @memberof RegisterComponent
   */
  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: User = this.registerForm.value;
      this.registerService.addUser(registerData).subscribe({
        next: (response) => {
          this.registerForm.reset();
          this.message = 'Registration successful!';
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Error:', error.message);
          this.message = error.message;
        },
      });
    }
  }
}
