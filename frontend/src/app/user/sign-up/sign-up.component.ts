import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../shared/user.service'
import { User } from 'src/app/shared/user.model';
import ToastsService from '../../services/toasts.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})

export class SignUpComponent implements OnInit {
  user: User;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  roles: any[];
  showSucessMessage: boolean;
  serverErrorMessages: string;

  signupForm: FormGroup

  constructor(
    public userService: UserService,
    private router: Router,
    private toastService: ToastsService) {
    this.signupForm = new FormGroup(
      {
        role: new FormControl(''),
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit() {
    this.resetForm(null);
  }

  resetForm(form: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      fullName: '',
      email: '',
      password: ''
    }

    if (this.roles)
      this.roles.map(x => x.selected = false);
  }

  onSubmit() {

    console.info(this.signupForm.value)

    this.userService.registerUser(this.signupForm.value)
      .subscribe((data) => {
        if (data['Succeeded'] == true) {
          this.toastService.generateSuccess('User registration successful');
          this.router.navigate(['/login'])
        } else {
          //this.toastService.generateErorr(error); TODO: make sure error is show up
        }
      });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

}
