import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import ToastsService from './toasts.service';

@Injectable({
  providedIn: 'root'
})
export default class CartService {
  cartItems$: Subject<Object[]>

  constructor(private toastsService: ToastsService) {
    this.cartItems$ = new Subject<Object[]>()
    this.loadCartItems()
  }

  getCartData(items): Object {
    if (!items || items.length == 0) {
      return {
        items: [],
        total: 0
      }
    }

    let grandTotal = 0
    let results = items.map(item => {
      let total = item['quantity'] * item['price']
      item['total'] = total
      grandTotal += total
      return item
    })
    
    return {
      items: results,
      total: grandTotal
    }
  }

  addItemToCart(product: any): void {
    const items = this.getCartFromStorage()
    const { _id, name, photo, price } = product
    const idx = items.findIndex(item => item['_id'] == _id)
    if (idx != -1) {
      items[idx]['quantity'] = items[idx]['quantity'] + 1
    } else {
      items.push({ _id, name, photo, price, quantity: 1 })
    }
    this.saveCartToStorage(items)
    this.toastsService.generateSuccess(`${name} added to Cart`)
    this.loadCartItems()
  }

  removeItemToCart(id: String, name: String): void {
    const items = this.getCartFromStorage()
    const updatedItems = items.filter(item => {
      return item['_id'] != id
    })
    this.saveCartToStorage(updatedItems)
    this.toastsService.generateSuccess(`${name} has been removed from Cart`)
    this.loadCartItems()
  }

  updateItemQuantity(id: String, quantity: number): void {
    const items = this.getCartFromStorage()
    const idx = items.findIndex(item => item['_id'] == id)
    if (idx != -1) {
      items[idx]['quantity'] = quantity
    }
    this.saveCartToStorage(items)
    this.loadCartItems()
  }

  loadCartItems(): void {
    setTimeout(() => {
      const items = this.getCartFromStorage()
      this.cartItems$.next(items)
    }, 0)
  }

  getCartFromStorage(): Object[] {
    let cart
    try {
      cart = JSON.parse(localStorage.getItem('shopping-cart')) || []
    } catch (err) {
      cart = []
      this.saveCartToStorage(cart)
    }
    return cart
  }

  saveCartToStorage(cart: any): void {
    localStorage.setItem('shopping-cart', JSON.stringify(cart))
  }
}