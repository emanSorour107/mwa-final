import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import ToastsService from './toasts.service';
import { Router } from '@angular/router';
import CartService from './cart.service';

@Injectable({
  providedIn: 'root'
})
export default class CustomerService {

  constructor(private http: HttpClient,
    private toastService: ToastsService,
    private cartService: CartService,
    private router: Router) { }

  makeOrder(items: Object[], farmerId: String): void {
    const orderItems = items.map(item => {
      return { _id: item['_id'], quantity: item['quantity'] }
    })

    const formData = {
      farmerId,
      orderItems,
      customerId: 'aasasasaas', // get current customer id
    }

    this.http.post(`${environment.apiUrl}/orders`, formData, {})
      .subscribe(result => {
        if (result['error']) {
          this.toastService.generateErorr('Unable to place order at this moment. Please try again later')
        } else {
          this.toastService.generateSuccess('Order has been placed!')
          this.cartService.clearCart()
          this.router.navigate(['/farmers'])
        }
      }, (error) => {
        this.toastService.generateErorr('Unable to place order at this moment. Please try again later')
      })
  }
}
