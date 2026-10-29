function SignupApp() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      setLoading(true);

      try {
        const response = await API.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = 'dashboard.html';
      } catch (err) {
        setError(err.message || 'Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-4" data-name="signup-app" data-file="signup-app.js">
        {/* --- THIS LINE IS UPDATED --- */}
        <div className="max-w-md w-full bg-[var(--card-color)] rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <a href="index.html" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-book-open text-2xl text-white"></div>
              </div>
              <span className="text-3xl font-bold text-[var(--primary-color)]">Stories</span>
            </a>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-4">Create Account</h1>
            <p className="text-[var(--text-secondary)] mt-2">Start your reading journey today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-or)] focus:border-transparent"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-[var(--text-secondary)] mt-6">
            Already have an account? <a href="login.html" className="text-[var(--primary-color)] font-medium">Login</a>
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('SignupApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SignupApp />);