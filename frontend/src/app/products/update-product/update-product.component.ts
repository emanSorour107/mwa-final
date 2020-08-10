import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';





@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateForm: FormGroup;
  id;
  product;

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {

    this.updateForm = formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [''],
      photo: [''],
      inStock: ['']
    })

    this.route.paramMap.subscribe((pMap) => {
      this.id = pMap['params']['id'];
    });

    // this.updateForm.patchValue({
    //   name: this.product.name,
    //   description: this.product.description
    // })

  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    var name = this.updateForm.getRawValue().name
    var description = this.updateForm.getRawValue().description
    var price = this.updateForm.getRawValue().price
    var photo = this.updateForm.getRawValue().photo
    var inStock = this.updateForm.getRawValue().inStock
    var product = { name: name, description: description, price: price, photo: photo, inStock: inStock }
    console.log(product)
    this.http.put(`http://localhost:3000/products/${this.id}`, product).subscribe((res) =>
      console.log("ok"))
  }


  getProduct(id: object) {
    this.product = this.productService.getProductById(id).subscribe(
    )
  }


}
