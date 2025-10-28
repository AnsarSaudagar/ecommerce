import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/ecommerce/src/environments/environment.development';
import { DashboardDataCounts } from '../models/dashboard-data-counts';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = environment.backendJavaUrl + "admin/";

  constructor(private http: HttpClient) { }

  getCardDataCounts(){
    return this.http.get<DashboardDataCounts>(this.apiUrl + "global/dashboard-counts");
  }
}
