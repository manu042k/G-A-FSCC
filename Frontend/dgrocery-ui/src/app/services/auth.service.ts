import { Injectable } from '@angular/core';
/**
 *
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
