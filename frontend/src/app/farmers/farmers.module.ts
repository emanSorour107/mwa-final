import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [FarmersComponent, ProductsComponent],
  imports: [
    CommonModule,
    FarmersRoutingModule
  ]
})
export class FarmersModule { }
