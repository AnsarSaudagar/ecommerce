import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users`);
  }

  // Get single user
  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/users/${id}`);
  }

  // Create new user
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/users`, user);
  }

  // Update user
  updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/users/${id}`, user);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Get user addresses
  getUserAddresses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/addresses`);
  }
}
