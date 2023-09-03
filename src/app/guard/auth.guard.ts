import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  // protected authenticated!: boolean;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      let activated: Observable<boolean> = new Observable<boolean>(
        (subscriber) => {
          console.log(this.authService.isAuthenticated());
          subscriber.next(true);
        },
      );
      return activated;
    } else {
      this.authService.login();
      return this.authService.authenticationEventObservable;
    }
  }
}
