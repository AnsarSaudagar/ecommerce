# Ecommerce Admin Panel

A comprehensive admin panel for managing your ecommerce platform built with Angular.

## Features

### 🏠 Dashboard
- Overview statistics (products, users, categories, reviews)
- Quick action buttons
- Modern, responsive design

### 📦 Products Management
- View all products with pagination
- Add new products with image upload
- Edit existing products
- Delete products
- Search and filter products
- Image upload functionality

### 👥 Users Management
- View all registered users
- User details and verification status
- Edit user information
- Delete users
- Search functionality

### 🏷️ Categories Management
- View all product categories
- Add new categories with image upload
- Edit existing categories
- Delete categories
- Search functionality

### ⭐ Reviews Management
- View all product reviews
- Verify/unverify reviews
- Delete reviews
- Search and filter reviews
- Review statistics (likes, dislikes)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI
- Backend API running

### Installation

1. Navigate to the admin project directory:
```bash
cd projects/admin
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api' // Update with your API URL
};
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## API Endpoints

The admin panel expects the following API endpoints:

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/upload-image` - Upload product image

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/addresses` - Get user addresses

### Categories
- `GET /api/product-categories` - Get all categories
- `GET /api/product-categories/:id` - Get single category
- `POST /api/product-categories` - Create new category
- `PUT /api/product-categories/:id` - Update category
- `DELETE /api/product-categories/:id` - Delete category
- `POST /api/product-categories/upload-image` - Upload category image

### Reviews
- `GET /api/product-reviews` - Get all reviews
- `GET /api/product-reviews/:id` - Get single review
- `GET /api/products/:id/reviews` - Get reviews by product
- `PUT /api/product-reviews/:id` - Update review
- `DELETE /api/product-reviews/:id` - Delete review
- `PATCH /api/product-reviews/:id/verify` - Verify review

## Data Models

### Product
```typescript
interface ProductModel {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}
```

### User
```typescript
interface UserModel {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  email_verified_at?: Date;
  password: string;
  api_token?: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
}
```

### Category
```typescript
interface ProductCategoryModel {
  id: number;
  name: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
}
```

### Review
```typescript
interface ProductReview {
  id: number;
  product_id: number;
  user_id?: number;
  name: string;
  email: string;
  title?: string;
  content?: string;
  rating: number;
  like_count?: number;
  dislike_count?: number;
  is_verified?: number;
  is_user_like?: number;
  created_at?: Date;
  updated_at?: Date;
}
```

## Features in Detail

### Image Upload
- Drag and drop image upload
- Image preview
- Support for common image formats
- Automatic image optimization

### Search and Filtering
- Real-time search across all entities
- Pagination for large datasets
- Advanced filtering options

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

### Form Validation
- Client-side validation
- Real-time error feedback
- User-friendly error messages

## Customization

### Styling
The admin panel uses a modern design system with:
- Consistent color palette
- Responsive grid system
- Custom CSS components
- Mobile-first approach

### Adding New Features
1. Create new components in `src/app/components/`
2. Add routes in `src/app/app.routes.ts`
3. Create services in `src/app/services/`
4. Update navigation in `src/app/components/admin-nav/`

## Deployment

### Production Build
```bash
ng build --configuration production
```

### Environment Configuration
Update `src/environments/environment.prod.ts` with your production API URL:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

## Support

For issues and feature requests, please contact the development team.

## License

This project is licensed under the MIT License.
