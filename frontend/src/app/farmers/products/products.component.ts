import { Component, OnInit } from '@angular/core';
import FarmerService from '../../services/farmer.service'
import CartService from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  farmerId: String
  products: Object[];

  constructor(private farmerService: FarmerService,
    private route: ActivatedRoute,
    private cartService: CartService) {

    this.route.params.subscribe(params => {
      this.farmerId = params["id"];

      this.farmerService.getAllProducts(this.farmerId)
        .subscribe(res => this.products = res['data'])
    });
  }


  ngOnInit(): void {
  }

  addToCart(product: Object): void {
    this.cartService.addItemToCart(product)
  }
}
