import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FarmersRoutingModule } from './farmers-routing.module';

import { FarmersComponent } from './farmers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [FarmersComponent, ProductsComponent, OrdersComponent],
  imports: [
    CommonModule,
    FarmersRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class FarmersModule { }
