import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDataService } from 'src/app/auth/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  usernames = []
  emails = []

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private router: Router) { }
  token = ''

  ngOnInit(): void {

    // Signup form
    this.signupForm = new FormGroup({
      'first-name': new FormControl(null),
      'last-name': new FormControl(null),
      'username': new FormControl(null, [this.invalidName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email, this.invalidEmail.bind(this)]),
      'password': new FormControl('', [Validators.required, this.invalidPassword.bind(this)]),
    })

    this.userDataService.getUserEmails().subscribe(data => {
      this.emails = data;
    })

    this.userDataService.getUsernames().subscribe(data => {
      this.usernames = data;

    })
  }

  //Validator Function
  invalidPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value.length < 6) {
      return { 'passwordShort': true }
    }
    return null
  }

  //Invalid Name Validator

  invalidName(control: FormControl): { [s: string]: boolean } {
    if (this.usernames.includes(control.value)) {
      return { 'usernameExists': true }
    }
    return null
  }
  invalidEmail(control: FormControl): { [s: string]: boolean } {
    if (this.emails.includes(control.value)) {
      return { 'emailExits': true }
    }
    return null
  }

  //Showing or hiding password
  passType = 'password'
  onClick() {
    this.passType = this.passType === 'password' ? 'text' : 'password'
  }


  //Submitting the form
  OnSubmit(form: any) {
    if (!form.valid) {
      return;
    }
    this.authService.signup(form.value)
    this.signupForm.reset();
    // this.router.navigate(['/account', 'login'])
  }
}
