import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../constants/user.interface';
import { Observable } from 'rxjs';
import { BASE_URL, USER_ENDPOINT } from '../constants/url';
/**
 *
 *
 * @export
 * @class RegisterService
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);

  constructor() {}

  addUser(newUser: User): Observable<string> {
    return this.http.post<string>(BASE_URL + USER_ENDPOINT, newUser);
  }
}
