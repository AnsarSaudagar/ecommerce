import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Account } from '../account/account.model';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  displayName?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginEmit = new Subject();
  loggedData: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationData: string;
  } = JSON.parse(localStorage.getItem('userData'));

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string,
    private toastr: ToastrService
  ) {
    this.apiNodeUrl += 'auth/';
  }

  key = 'AIzaSyBUHG5LFJg2r_hhboaP48Ig4vldvya5gCQ';

  register(userData: UserModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(this.apiNodeUrl + 'register', userData)
      .pipe(
        tap(res => this.toastr.success("Successfully Registered")),
        catchError((error) => {
          return throwError(
            () => this.toastr.error(error.error.message)
          );
        })
      );
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ user: UserModel; token: string }>(
        this.apiNodeUrl + 'login',
        credentials
      )
      .pipe(
        tap(({ user, token }) => {
          this.toastr.success("You are logged In")  
          this.handleAuthentication(user.email, user.id, token, 60*60);
        }),
        catchError((error) => {
          return throwError(
            () => {
              // console.log(error.error.message);
              this.toastr.error(error.error.message) 
            }
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    
    console.log("auto login");
    console.log(loadedUser);
    
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log(expirationDuration);
      
      this.autoLogout(expirationDuration);
    }else{
      this.logout()
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.loggedData = null;
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log("expiration timer = " + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      
    }, expirationDuration);
  }


  private handleAuthentication(
    email: string,
    userId: number | string,
    token: string,
    expiresIn: number
  ) {
    const expirationData = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, userId, token, expirationData);
    console.log(user);
    
    localStorage.setItem('userData', JSON.stringify(user))
    this.user.next(user);
    console.log(expiresIn);
    
    this.autoLogout(expiresIn* 1000);

  }

}
