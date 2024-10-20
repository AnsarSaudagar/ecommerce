import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from 'src/app/auth-old/user-data.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent {

  constructor(
    private httpService: HttpClient,
    private userDataService: UserDataService) { }




}
