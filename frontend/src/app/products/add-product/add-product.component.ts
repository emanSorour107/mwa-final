import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../products.service';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  file: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private productService: ProductsService) {

    this.productForm = formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [''],
      photo: [''],
      inStock: ['']
    })

  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.file = file;
  }

  onSubmit(): void {
    const formData = new FormData()
    formData.append('file', this.file)
    formData.append('name', this.productForm.getRawValue().name)
    formData.append('description', this.productForm.getRawValue().description)
    formData.append('price', this.productForm.getRawValue().price)
    formData.append('inStock', this.productForm.getRawValue().inStock)
    
    this.productService.postProduct(formData)
  }


}
