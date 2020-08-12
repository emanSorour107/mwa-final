import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export default class OrderService {

  constructor(private http: HttpClient) { }

  getOrders = (farmerId: String) : Observable<Object > => {
    console.log("farmerId: " + farmerId);
    return this.http.get(`${environment.apiUrl}/farmers/${farmerId}/orders`);
  }

  getAllOrders = () : Observable<Object > => {
    return this.http.get(`${environment.apiUrl}/orders`);
  }

  updateOrderStatus = (id, status) => {
    return this.http.put(`${environment.apiUrl}/orders/${id}?status=${status}`, {});
  }
}