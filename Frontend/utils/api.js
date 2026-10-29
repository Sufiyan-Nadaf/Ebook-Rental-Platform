const API = {
  baseURL: 'http://localhost:5000/api/v1',

  
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error; // Re-throw the error to be caught by the component
    }
  },

  async getFeaturedBooks() {
    return this.request('/books/featured');
  },

  async getBooks(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/books?${params}`);
  },

  async getBookById(id) {
    return this.request(`/books/${id}`);
  },

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async rentBook(bookId, duration) {
    return this.request('/rentals', {
      method: 'POST',
      body: JSON.stringify({ bookId, duration: duration.toString() }), 
    });
  },

  async getMyRentals() {
    return this.request('/rentals/my-rentals');
  },

  async getAccessUrl(rentalId) {
    return this.request(`/rentals/${rentalId}/access`, {
      method: 'POST', // Use POST to request a secure, one-time-use(ish) URL
    });
  }
};