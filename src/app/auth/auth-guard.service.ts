import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.loggedUser.pipe(take(1), // take ensures that the latest emitted value is used, and then unsubscribed automatically, to prevent bugs from rerunning the guard multiple times. That would create ongoing subscriptions.
      map(user => {
        const isAuth = !(!user || !user.token);

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(["/auth"]);
      }));
  }
}
