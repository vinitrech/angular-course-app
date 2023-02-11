import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null); // behaviorSubject will emit the latest value when a new subscriber listens
  token: string = '';

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  signup(authEmail: string, authPassword: string) {
    const postData = {
      email: authEmail,
      password: authPassword,
      returnSecureToken: true
    }

    const postOptions = {
      params: {
        key: 'AIzaSyBymC9b8hTQM57TkrE_6XQwRdw_3Iei1Tc'
      }
    }

    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      postData,
      postOptions).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    })); // tap allows to manipulate data without changing the response
  }

  login(authEmail: string, authPassword: string) {
    const postData = {
      email: authEmail,
      password: authPassword,
      returnSecureToken: true
    }

    const postOptions = {
      params: {
        key: 'AIzaSyBymC9b8hTQM57TkrE_6XQwRdw_3Iei1Tc'
      }
    }

    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      postData,
      postOptions).pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })); // tap allows to manipulate data without changing the response
  }

  autoLogin() {
    if (!localStorage.getItem('userData')) {
      return;
    }

    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
      // @ts-ignore <- added ignore due to the fact that the localstorage item will never be null when it reaches this point
    } = JSON.parse(localStorage.getItem('userData'));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
    }else{
      localStorage.removeItem('userData');
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.loggedUser.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // converts the response data to milliseconds and then add to current time
    const user = new User(email, userId, token, expirationDate);
    this.loggedUser.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = 'An error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password!';
        break;
    }

    return throwError(() => errorMessage);
  }
}
