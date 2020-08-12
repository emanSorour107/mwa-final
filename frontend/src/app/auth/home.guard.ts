import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from "../shared/user.service";

@Injectable()
export default class HomeGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userInfo = this.userService.getUserInfoForGuard()
    if (userInfo && userInfo['isLoggedIn']) {
      if (userInfo['isFarmer']) {
        this.router.navigateByUrl('/orders')
      } else {
        this.router.navigateByUrl('/farmers')
      }
    } else {
      return true
    }
  }
}
