import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router}  from '@angular/router';




@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productId;
  constructor(private productService : ProductsService, private router: Router) { }

  products = [];

  ngOnInit(): void {
     this.productService.getProducts().subscribe((response) => {
      this.products = response.data
 });
  }
 updateProduct(id: Object) {
   this.router.navigate(['/updateProduct', id])

  }
 
  
  
}
