import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [FarmersComponent, ProductsComponent],
  imports: [
    CommonModule,
    FarmersRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class FarmersModule { }
