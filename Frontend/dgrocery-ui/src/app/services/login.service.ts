import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  User,
  UserCredentials,
} from '../constants/user.interface';
import { BASE_URL, LOGIN_ENDPOINT } from '../constants/url';
/**
 *
 *
 * @export
 * @class LoginService
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);

  constructor() {}

  login(userCredentials: UserCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      BASE_URL + LOGIN_ENDPOINT,
      userCredentials
    );
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>('http://localhost:8000/users/api/user/info/');
  }
}
