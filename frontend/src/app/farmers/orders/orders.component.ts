import { Component, OnInit } from '@angular/core';
import OrderService from '../../services/order.service';


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

      this.orderService.getOrders(this.farmerId)
        .subscribe(orders => {
          console.log(orders);
          this.orders = orders;
          this.filteredOrders = orders;
        })
    });
  }

  ngOnInit(): void {
  }

  changeStatus = (order) => {
    console.log(order);
    this.orders.forEach(o => {
      if(o["orderCode"] == order.orderCode) {
        if(o["status"] === "PENDING") o["status"] = "READY";
        else if(o["status"] === "READY") o["status"] = "COMPLETE";
      }
    })
  }

  sortByStatus = (status : String) => {
    this.filteredOrders = this.orders.filter(o => o["status"] == status);
    console.log(this.filteredOrders);
  }
}
