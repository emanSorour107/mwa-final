import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";


@Injectable()
export default class FarmerGuard implements CanActivate {
  constructor(private router: Router, private userService : UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      const userInfo = this.userService.getUserInfoForGuard()
      if (userInfo['isFarmer']) {
        return true
      } else {
        this.router.navigateByUrl('/farmers')
        return false
      }
  }
}
