import { Component, OnInit } from '@angular/core';
import FarmerService from '../../services/farmer.service'
import CartService from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private farmerService: FarmerService, private cartService: CartService) { }

  products: Object[];

  ngOnInit(): void {
    this.farmerService.getAllProducts('1212')
      .subscribe(products => this.products = products)
  }

  addToCart(product: Object): void {
    this.cartService.addItemToCart(product)
  }
}
