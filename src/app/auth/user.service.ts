import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) { 
    this.apiNodeUrl += "user/";
  }

  getUserProfile(){
    return this.http.get<UserModel>(this.apiNodeUrl);
  }
}
