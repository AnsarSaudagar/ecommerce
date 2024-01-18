import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../account/account.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

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
  providedIn: 'root'
})


export class AuthService {
  loginEmit = new Subject();
  loggedData: { email: string; id: string; _token: string, _tokenExpirationData: string } = JSON.parse(localStorage.getItem('userData'))
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.user);

  }
  key = 'AIzaSyBUHG5LFJg2r_hhboaP48Ig4vldvya5gCQ'

  signup(account: Account) {
    this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key,
      {
        email: account.email,
        password: account.password,
        returnSecureToken: true
      }
    ).subscribe(data => {
      this.userDataSignup(data.idToken, account.username).subscribe(signData => {
        console.log(signData);
        console.log(account);

        this.userCreated(signData.displayName, signData.email, account.password, account['first-name'], account['last-name'])
      });
    })
  }

  login(account: Account) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key, {
      email: account.email,
      password: account.password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleErrors),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    )
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'))

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    console.log(loadedUser.email);

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);

      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    this.user.next(null);
    // this.router.navigate(['/acoount', 'login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.loggedData = null
    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number) {
    // console.log(expirationDuration);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  private userDataSignup(idToken: string, username: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBUHG5LFJg2r_hhboaP48Ig4vldvya5gCQ', {
      idToken: idToken,
      displayName: username,
      photoUrl: "",
      deleteAttribute: [],
      returnSecureToken: true
    })
  }

  private userCreated(username: string, email: string, password: string, firstName: string, lastName: string) {
    this.http.post('https://ecommerce-457bb-default-rtdb.firebaseio.com/users.json', {
      [username]: {
        password: password,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        wishlist: ['null'],
        cart: ['null'],
        address: ['null'],
      }
    }).subscribe(data => {
      console.log(data);
    })
  }


  private handleErrors(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured'
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage)
    }


    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password'
        break
    }
    console.log(errorMessage);

    return throwError(errorMessage)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationData = new Date(new Date().getTime() + +expiresIn * 1000)
    const user = new User(email, userId, token, expirationData)
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  getData(loggedData: any) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBUHG5LFJg2r_hhboaP48Ig4vldvya5gCQ', {
      idToken: loggedData._token
    })
  }

  deleteAccount(token: string, key: string, name: string) {
    // this.logout()
    this.router.navigate(['/'])
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=' + environment.apiKey, {
      idToken: token
    }).subscribe()
    this.http.delete(`${environment.firebaseMainUrl}users/${key}/${name}.json`).subscribe()
    this.logout();
  }

  updateData(value: string, topic: string, key: string, name: string) {
    let main = (): string => {
      switch (topic) {
        case "First Name": {
          return "firstName";
        }
        case "Last Name": {
          return "lastName";
        }
        case "Password": {
          return "lastName";
        }

      }
    }
    console.log(`${environment.firebaseMainUrl}users/${key}/${name}.json`);
    console.log(main());

    this.http.patch(`${environment.firebaseMainUrl}users/${key}/${name}.json`, { [`${main()}`]: value }).subscribe()
  }

  updateFullUser(key: string, name: string, value: any) {
    console.log(`${environment.firebaseMainUrl}users /${key}.json`);

    this.http.patch(`${environment.firebaseMainUrl}users/${key}.json`, { [name]: value }).subscribe()
  }



}
