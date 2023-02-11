import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.loggedUser.pipe(take(1), exhaustMap(user => {// take will take the specified number of values then unsubscribe / exhaustMap will take the return value from the first observable, then exchange it with the new observable created inside the function

      if (!user) {
        return next.handle(req);
      }

      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user ? user.token ? user.token : '' : '')
      });
      return next.handle(modifiedReq);
    }));
  }
}
