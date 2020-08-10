import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class CustomerService {

  constructor() { }

  makeOrder(items: Object[], address: Object): void {
    const products = items.map(item => {item['_id'], item['quantity']})
    const formData = {
      address,
      products,
      customerId: 'aasasasaas', // get current customer id
    }


  }
}
