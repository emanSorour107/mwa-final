import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
