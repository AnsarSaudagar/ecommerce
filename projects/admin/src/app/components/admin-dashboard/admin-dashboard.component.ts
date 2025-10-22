import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalReviews: 0
  };

  constructor() { }

  ngOnInit(): void {
    // Load dashboard statistics
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    // This would typically load from your services
    // For now, we'll set placeholder values
    this.stats = {
      totalProducts: 150,
      totalUsers: 89,
      totalCategories: 12,
      totalReviews: 234
    };
  }
}
