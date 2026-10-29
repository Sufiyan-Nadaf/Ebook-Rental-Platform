# Backend API Implementation Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## API Endpoints

### 1. User Authentication

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Login existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Books

#### GET /books/featured
Get featured books for homepage.

**Response:**
```json
[
  {
    "id": "book_id",
    "title": "Book Title",
    "author": "Author Name",
    "coverImage": "https://image-url.com",
    "rentalPrice": 2.99,
    "rating": 4.5,
    "isNew": true
  }
]
```

#### GET /books
Get all books with optional filters.

**Query Parameters:**
- `genre` (optional): Filter by genre
- `sortBy` (optional): Sort order (popular, newest, price)

**Response:**
```json
[
  {
    "id": "book_id",
    "title": "Book Title",
    "author": "Author Name",
    "coverImage": "https://image-url.com",
    "rentalPrice": 2.99,
    "rating": 4.5,
    "genre": "fiction"
  }
]
```

#### GET /books/:id
Get detailed information about a specific book.

**Response:**
```json
{
  "id": "book_id",
  "title": "Book Title",
  "author": "Author Name",
  "coverImage": "https://image-url.com",
  "rentalPrice": 2.99,
  "rating": 4.5,
  "pages": 350,
  "description": "Book description here...",
  "genre": "fiction"
}
```

---

### 3. Rentals (Protected)

#### POST /rentals
Create a new book rental.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookId": "book_id",
  "duration": 7
}
```

**Response:**
```json
{
  "id": "rental_id",
  "userId": "user_id",
  "bookId": "book_id",
  "startDate": "2025-10-23T10:00:00Z",
  "expiryDate": "2025-10-30T10:00:00Z",
  "duration": 7
}
```

#### GET /rentals/my-rentals
Get all active rentals for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": "rental_id",
    "expiryDate": "2025-10-30T10:00:00Z",
    "book": {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "coverImage": "https://image-url.com"
    }
  }
]
```

#### GET /rentals/:rentalId/check-access
Check if a rental is still valid (not expired).

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "hasAccess": true,
  "rental": {
    "id": "rental_id",
    "expiryDate": "2025-10-30T10:00:00Z",
    "book": {
      "id": "book_id",
      "title": "Book Title",
      "author": "Author Name",
      "content": "Book content here...",
      "totalPages": 350
    }
  }
}
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Books Collection
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  coverImage: String (URL),
  rentalPrice: Number,
  rating: Number,
  pages: Number,
  description: String,
  genre: String,
  content: String,
  isNew: Boolean,
  createdAt: Date
}
```

### Rentals Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  bookId: ObjectId (ref: Books),
  startDate: Date,
  expiryDate: Date,
  duration: Number (days),
  isActive: Boolean,
  createdAt: Date
}
```

---

## Access Control Logic

The rental access should be validated by comparing:
```javascript
const now = new Date();
const expiryDate = new Date(rental.expiryDate);
const hasAccess = now < expiryDate;
```

Users should NOT be able to access book content if `hasAccess` is false.