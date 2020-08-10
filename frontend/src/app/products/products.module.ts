import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';



@NgModule({
  declarations: [ProductsComponent, AddProductComponent, DeleteProductComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  exports: [
    ProductsComponent
  ]

})
export class ProductsModule { }
