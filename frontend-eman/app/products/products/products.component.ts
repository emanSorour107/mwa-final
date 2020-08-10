import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductsService) { }

  products = [];

  ngOnInit(): void {
     this.productService.getProducts().subscribe((response) => {
      this.products = response.data
 });

  }
 
  
  
}
