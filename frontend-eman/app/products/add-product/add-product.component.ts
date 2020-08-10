import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  {
  productForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.productForm = formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [''],
      photo: [''],
      inStock : ['']
    })

    }
    onSubmit() : void{
    var name = this.productForm.getRawValue().name
    var description = this.productForm.getRawValue().description
    var price = this.productForm.getRawValue().price
    var photo= this.productForm.getRawValue().photo
    var inStock =this.productForm.getRawValue().inStock 
    var product = {name :name, description: description, price: price, photo : photo, inStock : inStock}
    
    this.http.post<{idToken: string}>('http://localhost:3001/products/add', product).subscribe((res)=>
      console.log("ok"))
    }  
}
