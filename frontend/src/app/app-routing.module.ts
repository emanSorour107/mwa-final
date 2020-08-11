import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'farmers', loadChildren: () => import('./farmers/farmers.module').then(m => m.FarmersModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
