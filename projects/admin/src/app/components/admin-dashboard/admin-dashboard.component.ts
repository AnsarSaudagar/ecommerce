import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardDataCounts } from '../../models/dashboard-data-counts';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats : DashboardDataCounts = {
    products: 0,
    users: 0,
    categories: 0,
    reviews: 0
  };

  constructor(private dashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    // Load dashboard statistics
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    

    this.dashboardService.getCardDataCounts().subscribe({
      next: (totalStatCounts : DashboardDataCounts) => {
        this.stats = totalStatCounts;
      }
    })

    
  }
}
