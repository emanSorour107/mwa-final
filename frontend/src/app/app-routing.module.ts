import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'farmers', loadChildren: () => import('./farmers/farmers.module').then(m => m.FarmersModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
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