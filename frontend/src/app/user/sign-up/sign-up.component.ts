import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ToastsService from '../../services/toasts.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})

export class SignUpComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  signupForm: FormGroup

  constructor(public userService: UserService,
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
  }

  onSubmit() {
    console.info(this.signupForm.value)

    this.userService.registerUser(this.signupForm.value)
      .subscribe(() => {
        this.toastService.generateSuccess('User registration successful');
        this.router.navigate(['/login'])
      }, (error) => {
        this.toastService.generateErorr(error);
      });
  }
}
