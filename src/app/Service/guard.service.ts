import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(public auth: AuthService, public router: Router) {}
  // canActivate(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot
  //   ): boolean {
  //     if (!this.auth.isAuthenticated()) {
  //       this.router.navigate(['login']);
  //       return false;
  //     }
  //     return true;
  //   }
  // }
  // canActivate(): boolean {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }
}
