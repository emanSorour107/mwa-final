import { Component, OnInit } from '@angular/core';
import OrderService from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  farmerId: String
  orders;
  filteredOrders;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.farmerId = params["id"];
      this.orderService.getAllOrders()
      .subscribe(orders => {
        console.log(orders);
        this.orders = orders;
        this.filteredOrders = this.orders;
      })
    });
  }

  ngOnInit(): void {
  }

  changeStatus = (order) => {
    this.orders.forEach(or => {
      let status = "";
      if (or["_id"] == order._id) {
        if (or["status"] === "PENDING") status = "READY";
        else if (or["status"] === "READY") status = "COMPLETE";
        this.orderService.updateOrderStatus(order);
        or["status"] = status;
      }
    })
  }

  filterByStatus = (status: String) => {
    if(status === "") this.filteredOrders = this.orders;
    else this.filteredOrders = this.orders.filter(o => o["status"] == status);
  }

}
