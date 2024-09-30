import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/constants/user.interface';

/**
 *
 *
 * @export
 * @class LoginComponent
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  private loginservice = inject(LoginService);
  private router = inject(Router);
  message: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   *
   *
   * @memberof LoginComponent
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.loginservice.login(loginData).subscribe({
        next: (response: AuthResponse) => {
          this.loginForm.reset();
          this.message = 'Login successful!';
          localStorage.setItem('accessToken', response.access);
          this.router.navigate(['product-list']);
        },
        error: (error) => {
          console.error('Error:', error.message);
          this.message = error.message;
        },
      });
    }
  }

  /**
   *
   *
   * @memberof LoginComponent
   */
  onRegisterBtnClick(): void {
    this.router.navigate(['register']);
  }
}
