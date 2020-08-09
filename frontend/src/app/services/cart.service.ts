import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class CartService {
  cartItems$: Subject<Object[]>

  constructor() {
    this.cartItems$ = new Subject<Object[]>()
    this.loadCartItems()
  }

  addItemToCart(product: any): void {
    const items = this.getCartFromStorage()
    const { _id, name, photo, price } = product
    items.push({ _id, name, photo, price })
    this.saveCartToStorage(items)
    this.loadCartItems()
  }

  loadCartItems() : void {
    setTimeout(() => {
      const items = this.getCartFromStorage()
      console.log('Reload Shopping Cart')
      this.cartItems$.next(items)
    }, 0)
  }

  getCartFromStorage(): Object[] {
    let cart
    try {
      cart = JSON.parse(localStorage.getItem('shopping-cart'))
    } catch (err) {
      cart = []
      this.saveCartToStorage(cart)
    }
    return cart
  }

  saveCartToStorage(cart: any) : void {
    localStorage.setItem('shopping-cart', JSON.stringify(cart))
  }
}