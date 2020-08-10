import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getProducts(){
       return this.http.get('http://localhost:3001/api/products/all-products')
  }
}
