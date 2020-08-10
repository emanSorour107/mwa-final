import { Component, OnInit } from '@angular/core';
import ToastsService from '../services/toasts.service'

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  toasts = []
  constructor(private toastService: ToastsService) {
    this.toastService.toasts$
      .subscribe(items => this.toasts = items)
  }

  ngOnInit(): void {
  }

  removeToast(id: number): void {
    this.toastService.removeToast(id)
  }
}
