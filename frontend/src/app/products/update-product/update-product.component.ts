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
      this.getProduct()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const name = this.updateForm.getRawValue().name
    const description = this.updateForm.getRawValue().description
    const price = this.updateForm.getRawValue().price
    const photo = this.updateForm.getRawValue().photo
    const inStock = this.updateForm.getRawValue().inStock
    const product = { name: name, description: description, price: price, photo: photo, inStock: inStock }
    this.productService.updateProduct(this.id, product)
  }

  async getProduct() {
    console.log('getting product ...')
    this.productService.getProductById(this.id)
    .subscribe((res) => {
      console.log('patching product ...')
      const product = res['data']
      this.updateForm.patchValue({
        name: product['name'], 
        description: product['description'],
        price : product['price'],
        inStock :product['inStock']
      })
    })
  }
}
