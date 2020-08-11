import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmersComponent } from './farmers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: FarmersComponent },
  { path: ':id/orders', component: OrdersComponent},
  { path: ':id', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmersRoutingModule { }
