import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import HomeGuard from './auth/home.guard'
import CustomerGuard from './auth/customer.guard';
import FarmerGuard from './auth/farmer.guard';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent, canActivate: [HomeGuard],
    children: [{ path: '', component: SignUpComponent }]
  },

  {
    path: 'login', component: UserComponent, canActivate: [HomeGuard],
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'farmers', canActivate: [AuthGuard, CustomerGuard], loadChildren: () => import('./farmers/farmers.module').then(m => m.FarmersModule) },
  { path: 'customers', canActivate: [AuthGuard, CustomerGuard], loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'products', canActivate: [AuthGuard, FarmerGuard], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'orders', canActivate: [AuthGuard, FarmerGuard], loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/**
 * /farmers => Customer
 * /farmers/:id
 * /farmers/:id/products
 * /farmers/:id/products/:prodId
 * /customers/shopping-cart
 * /customers/checkout
 * /customers/orders
 *
 * /products => Farmer (manage products)
 * /products/add
 * /products/:id/update
 * /orders -> manages Order status
 * /orders/:id
 *
 */