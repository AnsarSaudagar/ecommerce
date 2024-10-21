import { Component } from '@angular/core';
import { AuthService } from '../auth-old/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../auth-old/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private auth: AuthService, private http: HttpClient, private userData: UserDataService) { }
  loggedData: { email: string; id: string; _token: string, _tokenExpirationData: string } = JSON.parse(localStorage.getItem('userData'))
  ngOnInit() {
    if (this.loggedData) {
      console.log(this.loggedData);
      // this.auth.getData(this.loggedData).subscribe(data => {
      //   // console.log(data);
      // })
    }


  }
}
