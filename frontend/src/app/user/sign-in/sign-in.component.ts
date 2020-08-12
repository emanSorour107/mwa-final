import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ToastsService from 'src/app/services/toasts.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup

  constructor(public userService: UserService,
    private router: Router,
    private toastService: ToastsService) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('john@gmail.com', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl('123456', [Validators.required]),
      }
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    const { email, password } = this.loginForm.value
    this.userService.login(email, password, () => {
      this.router.navigateByUrl('/orders')
    }, (error) => {
      this.toastService.generateErorr("Unable to signin at this moment. Please try again later")
    });
  }

}
