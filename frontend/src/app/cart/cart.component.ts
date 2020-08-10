import { Component, OnInit } from '@angular/core';
import CartService from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartCount: number = 0
  
  constructor(private cartService: CartService) { 
    this.cartService.cartItems$.subscribe((cartItems) => {
      console.log('Updating the Cart')
      this.cartCount = cartItems.length
    })
  }
}
