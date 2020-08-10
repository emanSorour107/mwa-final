import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get('http://localhost:3000/products')
}

deleteProduct(id) {
  return this.http.delete(`http://localhost:3000/products/${id}`)
}

getProductById(id: object){
  return this.http.get(`http://localhost:3000/products/${id}`)
}

}
