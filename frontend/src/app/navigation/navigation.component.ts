import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn: false
  isCustomer: false
  isFarmer: false
  userName: String

  constructor(private userService: UserService, private router: Router) {
    this.userService.userInfo$.subscribe(user => {
      this.isCustomer = user['isCustomer']
      this.isLoggedIn = user['isLoggedIn']
      this.isFarmer = user['isFarmer']
      this.userName = user && user['firstName'] ? (user['firstName'] + ' ' + user['lastName']) : ''
    })
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }

}
