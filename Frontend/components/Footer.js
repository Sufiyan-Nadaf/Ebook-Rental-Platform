function Footer() {
  try {
    return (
      <footer className="bg-gray-900 text-white mt-20" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                  <div className="icon-book-open text-lg text-white"></div>
                </div>
                <span className="text-xl font-bold">Stories</span>
              </div>
              <p className="text-gray-400 text-sm">Rent your favorite eBooks for a fixed duration.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="browse.html" className="hover:text-white transition-colors">Browse Books</a></li>
                <li><a href="index.html#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="login.html" className="hover:text-white transition-colors">Login</a></li>
                <li><a href="signup.html" className="hover:text-white transition-colors">Sign Up</a></li>
                <li><a href="dashboard.html" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Stories. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}