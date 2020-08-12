import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    this.userInfo$ = new Subject<Object>()
    this.loadUserData()
  }

  userInfo$: Subject<Object>
  userInfo: Object

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  loadUserData() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      const userData = JSON.parse(userPayload);
      let user = null
      // remove token if its expired
      if (!userData || userData['exp'] <= Date.now() / 1000) {
        this.deleteToken()
      } else {
        user = userData
      }

      this.userInfo = this.prepareUserInfo(user)
      this.userInfo$.next(this.userInfo)
    } else {
      this.userInfo = this.prepareUserInfo(null)
      this.userInfo$.next(this.userInfo)
    }
  }

  getUserInfoForGuard() {
    this.loadUserData()
    return this.userInfo
  }

  prepareUserInfo(userData) {
    if (!userData) {
      return {
        isLoggedIn: false
      }
    }

    return {
      ...userData,
      isLoggedIn: true,
      isCustomer: userData.role == 'CUSTOMER',
      isFarmer: userData.role == 'FARMER'
    }
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
        this.loadUserData()
        successCB()
      }, (error) => errorCB(error))
  }

  logout(): void {
    this.deleteToken()
    this.loadUserData()
  }

  buildNoAuthHeaders() {
    return {
      headers: new Headers({ 'noauth': 'true' })
    }
  }
}
