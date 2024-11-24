import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth-old/auth.service';
import { AuthenticationService } from './auth/authentication.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
    initFlowbite();
  }
}
