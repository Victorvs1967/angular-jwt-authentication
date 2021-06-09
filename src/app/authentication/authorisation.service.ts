import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators'
import * as moment from 'moment';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor(private http: HttpClient) { }
  
  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:8080/auth', { name: email, password })
      .pipe(map(
        (res: any) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.jwtToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at') ?? JSON.parse('');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
