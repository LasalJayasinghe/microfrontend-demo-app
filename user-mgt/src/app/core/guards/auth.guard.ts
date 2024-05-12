import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {TokenService} from "../../service/secure/token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private route: Router) {

  }

  canActivate() {
    return true;
  //   if (this.tokenService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.route.navigate(['login']).then();
  //     return false;
  //   }
  // }
}
}
