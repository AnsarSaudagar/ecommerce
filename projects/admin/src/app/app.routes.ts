import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { 
    path: 'admin/products', 
    loadComponent: () => import('./components/admin-products/admin-products.component').then(m => m.AdminProductsComponent)
  },
  { 
    path: 'admin/products/new', 
    loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent)
  },
  { 
    path: 'admin/products/:id/edit', 
    loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent)
  },
  { 
    path: 'admin/users', 
    loadComponent: () => import('./components/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
  },
  { 
    path: 'admin/categories', 
    loadComponent: () => import('./components/admin-categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
  },
  { 
    path: 'admin/categories/new', 
    loadComponent: () => import('./components/category-form/category-form.component').then(m => m.CategoryFormComponent)
  },
  { 
    path: 'admin/categories/:id/edit', 
    loadComponent: () => import('./components/category-form/category-form.component').then(m => m.CategoryFormComponent)
  },
  { 
    path: 'admin/reviews', 
    loadComponent: () => import('./components/admin-reviews/admin-reviews.component').then(m => m.AdminReviewsComponent)
  }
];
