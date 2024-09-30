import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/constants/user.interface';
/**
 *
 *
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userInfo$?: Observable<User>;
  private router = inject(Router);

  private loginservice = inject(LoginService);
  /**
   *
   *
   * @memberof ProfileComponent
   */
  ngOnInit(): void {
    this.userInfo$ = this.loginservice.getUserInfo();
  }
  /**
   *
   *
   * @memberof ProfileComponent
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
