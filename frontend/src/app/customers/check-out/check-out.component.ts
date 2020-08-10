import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CartService from '../../services/cart.service';
import CustomerService from '../../services/customer.service'

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  checkoutForm: FormGroup
  cart = { total: 0, items: [] }

  constructor(private cartService: CartService, private customerService: CustomerService) {
    this.checkoutForm = new FormGroup(
      {
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(5)
        ])),
        name: new FormControl('', [Validators.required])
      }
    )

    this.cartService.cartItems$
      .subscribe(items => {
        Object.assign(this.cart, this.cartService.getCartData(items))
      })

    this.cartService.loadCartItems()
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const { street, city, state, zipcode, name } = this.checkoutForm.value
    this.customerService.makeOrder(this.cart.items, {street, city, state, zipcode, name})
  }
}
