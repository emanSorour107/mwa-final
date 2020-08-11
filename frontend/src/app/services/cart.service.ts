import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ToastsService from './toasts.service';

const CART_KEY = 'shopping-cart'

@Injectable({
  providedIn: 'root'
})
export default class CartService {
  cart$: Subject<Object>

  constructor(private toastsService: ToastsService) {
    this.cart$ = new Subject<Object>()
    this.loadCart()
  }

  getCartData(cart: Object): Object {
    if (!cart['items'] || cart['items'].length == 0) {
      return {
        items: [],
        total: 0,
        farmerId: cart['farmerId']
      }
    }

    let grandTotal = 0
    let results = cart['items'].map(item => {
      let total = item['quantity'] * item['price']
      item['total'] = total
      grandTotal += total
      return item
    })

    return {
      items: results,
      total: grandTotal,
      farmerId: cart['farmerId']
    }
  }

  addItemToCart(product: any): void {
    const cart = this.getCartFromStorage()

    if (cart['farmerId'] && product['farmer']['_id'] !== cart['farmerId']) {
      this.toastsService.generateErorr('Cannot buy Product from different Farmer at once. Please remove all items in cart in order to procceed')
      return
    }

    const items = cart['items']
    const { _id, name, photo, price } = product
    const idx = items.findIndex(item => item['_id'] == _id)
    if (idx != -1) {
      items[idx]['quantity'] = items[idx]['quantity'] + 1
    } else {
      items.push({ _id, name, photo, price, quantity: 1 })
    }

    const updatedCart = {
      farmerId: product['farmer']['_id'],
      items,
      total: 0
    }
    this.saveCartToStorage(updatedCart)
    this.toastsService.generateSuccess(`${name} added to Cart`)
    this.loadCart()
  }

  removeItemToCart(id: String, name: String): void {
    const cart = this.getCartFromStorage()
    const items = cart['items']
    const updatedItems = items.filter(item => {
      return item['_id'] != id
    })
    const updatedCart = {
      ...cart,
      items: updatedItems
    }
    this.saveCartToStorage(updatedCart)
    this.toastsService.generateSuccess(`${name} has been removed from Cart`)
    this.loadCart()
  }

  updateItemQuantity(id: String, quantity: number): void {
    const cart = this.getCartFromStorage()
    const items = cart['items']
    const idx = items.findIndex(item => item['_id'] == id)
    if (idx != -1) {
      items[idx]['quantity'] = quantity
    }

    const updatedCart = {
      ...cart,
      items
    }
    this.saveCartToStorage(updatedCart)
    this.loadCart()
  }

  loadCart(): void {
    setTimeout(() => {
      const cart = this.getCartFromStorage()
      this.cart$.next(cart)
    }, 0)
  }

  getCartFromStorage(): Object[] {
    let cart, defaultCart = { items: [], total: 0, farmerId: '' }
    try {
      cart = JSON.parse(localStorage.getItem(CART_KEY)) || defaultCart
    } catch (err) {
      cart = defaultCart
      this.saveCartToStorage(cart)
    }
    return cart
  }

  saveCartToStorage(cart: Object): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }

  clearCart(): void {
    localStorage.removeItem(CART_KEY)
  }
}