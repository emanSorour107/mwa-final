import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class ToastsService {

  toasts$: Subject<Object[]>
  toasts = []

  constructor() {
    this.toasts$ = new Subject<[]>()
  }

  generateErorr(message: String): void {
    this.generateToast({ message, isSuccess: false })
  }

  generateSuccess(message: String): void {
    this.generateToast({ message, isSuccess: true })
  }

  generateToast({ message, isSuccess }): void {
    let toast = { message, isSuccess, id: new Date().getTime() }
    this.toasts.push(toast)
    setTimeout(() => {
      this.removeToast(toast.id)
    }, 5000)
    this.toasts$.next(this.toasts)
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id != id)
    this.toasts$.next(this.toasts)
  }
}
