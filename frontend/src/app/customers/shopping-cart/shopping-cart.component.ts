import { Component, OnInit } from '@angular/core';
import CartService from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cart = { total: 0, items: [] }

  constructor(private cartService: CartService) {
    this.cartService.cartItems$
      .subscribe(items => {
        Object.assign(this.cart, this.cartService.getCartData(items))
      })

    this.cartService.loadCartItems()
  }

  ngOnInit(): void {
  }

  removeFromCart(item): void {
    this.cartService.removeItemToCart(item._id, item.name)
  }

  updateItemQuantity(id: String, event: any): void {
    this.cartService.updateItemQuantity(id, event.target.value)
  }
}
