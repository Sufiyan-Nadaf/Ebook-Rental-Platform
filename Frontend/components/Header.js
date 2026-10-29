// components/Header.js
function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  };

  return (
    <nav className="bg-[var(--navbar-color)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* --- THIS LINE IS UPDATED --- */}
        {/* It now always links to index.html */}
        <a href="index.html" className="flex items-center space-x-2">
          {/* A light-cream logo background to match the body */}
          <div className="w-8 h-8 bg-[#FFFBEB] text-[var(--navbar-color)] rounded-lg flex items-center justify-center">
            <div className="icon-book-open text-xl font-bold"></div>
          </div>
          <span className="text-2xl font-bold text-white">Stories</span>
        </a>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <a href="browse.html" className="text-sm font-medium text-white hover:opacity-80">
                Browse
              </a>
              <a href="dashboard.html" className="text-sm font-medium text-white hover:opacity-80">
                My Rentals
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm font-medium text-white hover:opacity-80"
              >
                <div className="icon-log-out text-lg"></div>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <a href="browse.html" className="text-sm font-medium text-white hover:opacity-80">
                Browse
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-white hover:opacity-80">
                How It Works
              </a>
              <a
                href="login.html"
                className="flex items-center space-x-2 text-sm font-medium text-white hover:opacity-80"
              >
                <div className="icon-user text-lg"></div>
                <span>Login</span>
              </a>
              <a
                href="signup.html"
                className="px-4 py-2 bg-white text-[var(--navbar-color)] text-sm rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}