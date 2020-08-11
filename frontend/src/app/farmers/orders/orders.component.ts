import {Component, OnInit} from '@angular/core';
import FarmerService from '../../services/farmer.service'
import OrderService from "../../services/order.service";



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  constructor(private farmerService: FarmerService, private orderService: OrderService) { }

  orders: Object[];

  ngOnInit(): void {
    this.orderService.getAllOrders('asaasasasas')
      .subscribe(products => {
        this.orders = products;
        console.log(this.orders);
      })
  }
  
}


