import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export default class FarmerService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllProducts = (farmerId: String) : Observable<Object> => {
    return this.http.get(`${environment.apiUrl}/farmers/${farmerId}`)
  }

  getAllFarmers = () : Observable<Object> => {
    return this.http.get(`${environment.apiUrl}/farmers`)
  }
}