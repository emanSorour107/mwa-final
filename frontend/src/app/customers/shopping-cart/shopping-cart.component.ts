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
        this.cart.total = items && items.length > 1 && items
          .map(item => item['price'] * item['quantity'])
          .reduce((val, val2) => val + val2) | 0
        this.cart.items = items
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
