import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
