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
    return this.http.get('http://localhost:3001/products/all-products')
}

deleteProducts(id) {
  return this.http.delete('localhost:3001/products/delete', {params : {'id': id}})
}

}
