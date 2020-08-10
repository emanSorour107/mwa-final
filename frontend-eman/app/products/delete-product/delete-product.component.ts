import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from "@angular/router";
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import {Router}  from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})

export class DeleteProductComponent implements OnInit {

  id;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private _router : Router
  ) {
    route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.id)
    });
  }

  ngOnInit(): void {
    this.productService.deleteProducts(this.id).subscribe((response) => {
     console.log("deleted")
  })
}
deleteButtonClick(id){
  this._router.navigate(['/deleteProduct', id])
}

}
