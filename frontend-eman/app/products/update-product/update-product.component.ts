import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.updateForm = formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [''],
      photo: [''],
      inStock : ['']
    })

    }
    onSubmit() : void{
    var name = this.updateForm.getRawValue().name
    var description = this.updateForm.getRawValue().description
    var price = this.updateForm.getRawValue().price
    var photo= this.updateForm.getRawValue().photo
    var inStock =this.updateForm.getRawValue().inStock 
    var product = {name :name, description: description, price: price, photo : photo, inStock : inStock}
    // , { params: { id: '5f30450e0dac253790ba1d3b' } }
    this.http.post<{idToken: string}>('http://localhost:3001/products/update/5f30450e0dac253790ba1d3b', product ).subscribe((res)=>
      console.log("ok"))
    }  
    ngOnInit():void{

    }

}
