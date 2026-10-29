# Stories - eBook Rental Platform

## Overview
Stories is a modern eBook rental platform that allows users to rent digital books for a fixed duration, similar to Amazon Kindle but with a rental-based model.

## Features
- User authentication (Login/Signup)
- Browse and search eBooks
- Rent books for 7, 14, or 30 days
- Time-based access control (users lose access after rental expires)
- User dashboard to manage active rentals
- eBook reader interface

## Pages
- **index.html** - Landing page with featured books
- **login.html** - User login page
- **signup.html** - User registration page
- **browse.html** - Browse and search books
- **book-detail.html** - Book details with rental options
- **dashboard.html** - User dashboard showing active rentals
- **reader.html** - eBook reader with access control

## Tech Stack
- **Frontend**: React 18, TailwindCSS
- **Icons**: Lucide Icons
- **Backend**: Ready to connect to Node.js/Express API

## Backend API Requirements
The frontend is configured to connect to `http://localhost:5000/api`. You need to implement the following endpoints:

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Book Endpoints
- `GET /api/books/featured` - Get featured books
- `GET /api/books` - Get all books (with filters)
- `GET /api/books/:id` - Get single book details

### Rental Endpoints
- `POST /api/rentals` - Create new rental
- `GET /api/rentals/my-rentals` - Get user's active rentals
- `GET /api/rentals/:id/check-access` - Check if rental is still valid

## Getting Started

### Running with Mock Data (No Backend Required)
1. Simply open `index.html` in a browser
2. The app will automatically use mock data for demonstration
3. You can test all features including login, signup, browsing books, renting, and reading

### Connecting to Real Backend API
1. Set up your backend API at `http://localhost:5000/api`
2. In `utils/api.js`, change `useMockData: true` to `useMockData: false`
3. Implement all the required API endpoints as documented in `BACKEND_API_GUIDE.md`

## Color Theme
- Primary: #8B5CF6 (Purple)
- Secondary: #EC4899 (Pink)
- Accent: #F59E0B (Amber)