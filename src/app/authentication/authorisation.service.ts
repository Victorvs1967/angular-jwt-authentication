import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

    constructor(private http: HttpClient) { }
    
    login(email: string, password: string) {
      return this.http.post<User>('api/login', { email, password });
    }
}
