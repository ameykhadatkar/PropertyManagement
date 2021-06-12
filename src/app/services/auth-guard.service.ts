import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (sessionStorage.getItem("isLogin") == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}