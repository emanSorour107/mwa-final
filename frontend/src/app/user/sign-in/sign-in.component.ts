import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import ToastsService from 'src/app/services/toasts.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup

  constructor(public userService: UserService,
    private router: Router,
    private toastService: ToastsService) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('tien@gmail.com', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl('123456', [Validators.required]),
      }
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    const { email, password } = this.loginForm.value
    this.userService.login(email, password, () => {
      this.router.navigate(['/'])
    }, (error) => {
      this.toastService.generateErorr(error)
    });
  }

}
