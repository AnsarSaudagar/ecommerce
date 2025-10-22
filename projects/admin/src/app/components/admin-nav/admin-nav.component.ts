import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  isMenuOpen = false;

  navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
