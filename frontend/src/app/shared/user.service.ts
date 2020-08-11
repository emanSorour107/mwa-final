import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    return null;
  }

  registerUser(user: Object): Observable<Object> {
    const payload = {
      ...user,
      isFarmer: user['role'] == 'FARMER',
    }
    return this.http.post(`${environment.apiUrl}/signup`, payload)
  }

  login(email: String, password: String, successCB: Function, errorCB: Function) {
    const payload = { email, password }
    this.http.post(`${environment.apiUrl}/login`, payload, { observe: 'response' })
      .subscribe((res) => {
        this.saveToken(res.headers.get('Authentication'))
        successCB()
      }, (error) => errorCB(error))
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }

    return false;
  }
}
