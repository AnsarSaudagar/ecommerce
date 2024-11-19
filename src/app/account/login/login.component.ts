import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, map } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/auth-old/auth.service';
import { UserDataService } from 'src/app/auth-old/user-data.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  loginForm: FormGroup;
  emails = []
  userData!: any;
  email = ""
  passType = 'password'


  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private authenticationService: AuthenticationService) { }
  faError = faExclamationCircle
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null),
    })

    this.userDataService.getUserEmails().subscribe(data => {
      this.emails = data;
    })
  }

  OnSubmit(form: any) {
    console.log(this.loginForm.value);
    let authObs: Observable<any> = this.authenticationService.login(form.value)

    authObs.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/'])
      this.authService.loginEmit.next(true);
    }, (error) => {
      console.log(error);
    })
  }
  // passType = 'password'
  onClick() {
    this.passType = this.passType === 'password' ? 'text' : 'password'
  }

  // invalidEmail(control: FormControl): { [s: string]: boolean } {
  //   if (!this.emails.includes(control.value)) {
  //     return { 'emailNotExists': true }
  //   }
  //   return null
  // }
  // checkAuth(control: FormGroup): { [s: string]: boolean } {
  //   let mainData = {
  //     email: '',
  //     password: '',
  //     username: ''
  //   };
  //   this.userDataService.getSpecificUserData(control.controls['email'].value).pipe(
  //     map(data => {
  //       mainData = data;
  //       return mainData;
  //     })
  //   ).subscribe((info: any) => {
  //     console.log(mainData);


  //   });
  //   if (control.controls['password'].value !== mainData.password) {
  //     console.log("check");
  //     return { 'wrongPassword': true }
  //   }
  //   return null
  // }
}
