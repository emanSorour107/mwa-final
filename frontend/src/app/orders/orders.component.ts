import { Component, OnInit } from '@angular/core';
import OrderService from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';
import ToastsService from '../services/toasts.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  farmerId: String
  orders;
  filteredOrders;

  constructor(private orderService: OrderService, private userService: UserService,
    private route: ActivatedRoute, private toastService: ToastsService) {
    this.route.params.subscribe(params => {
      this.farmerId = this.userService.userInfo['uid'];
      this.orderService.getOrders(this.farmerId)
        .subscribe(orders => {
          this.orders = orders;
          this.filteredOrders = this.orders;
        })
    });
  }

  ngOnInit(): void {
  }

  changeStatus = (order) => {
    const currentStatus = order.status
    let targetStatus
    switch (currentStatus) {
      case 'PENDING':
        targetStatus = 'READY'
        break

      case 'READY':
        targetStatus = 'COMPLETE'
        break

      default:
    }

    this.orderService.updateOrderStatus(order._id, targetStatus)
      .subscribe((res) => {
        this.toastService.generateSuccess('Status changed successfully')
        this.orderService.getOrders(this.farmerId)
          .subscribe(orders => {
            this.orders = orders;
            this.filteredOrders = this.orders;
          })
      }, (error) => {
        this.toastService.generateErorr('Unable to change status at this moment')
      });
  }

  filterByStatus = (status: String) => {
    if (status === "") this.filteredOrders = this.orders;
    else this.filteredOrders = this.orders.filter(o => o["status"] == status);
  }

}
