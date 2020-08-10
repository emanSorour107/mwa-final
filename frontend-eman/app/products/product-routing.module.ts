import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';





const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'deleteProduct/:id', component: DeleteProductComponent },
  { path: 'updateProduct', component: UpdateProductComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
