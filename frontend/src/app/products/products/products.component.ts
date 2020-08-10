import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  id;
  constructor(private productService: ProductsService, private router: Router) { }

  products = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data
    });
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe((response) => {
      console.log("deleted")
    })
  }

}
