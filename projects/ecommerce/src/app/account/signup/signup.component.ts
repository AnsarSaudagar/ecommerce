import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-old/auth.service';
import { UserDataService } from '../../auth-old/user-data.service';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  usernames = [];
  emails = [];

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  token = '';

  ngOnInit(): void {
    // Signup form
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      middle_name: new FormControl(null),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    // this.userDataService.getUserEmails().subscribe((data) => {
    //   this.emails = data;
    // });

    // this.userDataService.getUsernames().subscribe((data) => {
    //   this.usernames = data;
    // });
  }

  //Validator Function
  invalidPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value.length < 6) {
      return { passwordShort: true };
    }
    return null;
  }

  //Invalid Name Validator

  invalidName(control: FormControl): { [s: string]: boolean } {
    if (this.usernames.includes(control.value)) {
      return { usernameExists: true };
    }
    return null;
  }
  invalidEmail(control: FormControl): { [s: string]: boolean } {
    if (this.emails.includes(control.value)) {
      return { emailExits: true };
    }
    return null;
  }

  //Showing or hiding password
  passType = 'password';
  onClick() {
    this.passType = this.passType === 'password' ? 'text' : 'password';
  }

  //Submitting the form
  OnSubmit(form: any) {
    if (!form.valid) {
      return;
    }

    this.authenticationService.register(form.value).subscribe({
      next: (user) => {
        this.signupForm.reset();
        this.router.navigate(['/account', 'login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
