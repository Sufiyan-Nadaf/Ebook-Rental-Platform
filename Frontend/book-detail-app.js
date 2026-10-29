function BookDetailApp() {
  try {
    const [book, setBook] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [selectedDuration, setSelectedDuration] = React.useState(7);
    const [renting, setRenting] = React.useState(false);
    const [customMode, setCustomMode] = React.useState(false);
    const [customValue, setCustomValue] = React.useState(1);
    const [customUnit, setCustomUnit] = React.useState('days');

    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const bookId = params.get('id');
      if (bookId) {
        fetchBook(bookId);
      }
    }, []);

    const fetchBook = async (id) => {
      try {
        const data = await API.getBookById(id);
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book:', error);
      } finally {
        setLoading(false);
      }
    };

    const calculateCustomDuration = () => {
      if (customUnit === 'minutes') {
        return customValue / (24 * 60); 
      } else if (customUnit === 'hours') {
        return customValue / 24;
      } else if (customUnit === 'days') {
        return customValue;
      } else if (customUnit === 'months') {
        return customValue * 30;
      }
      return customValue;
    };

    const calculatePrice = (days) => {
      // Assuming book.rentalPrice is the price for 7 days (1 week)
      return (book.rentalPrice * (days / 7)).toFixed(2);
    };

    const handleRent = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      const duration = customMode ? calculateCustomDuration() : selectedDuration;
      
      setRenting(true);
      try {
        await API.rentBook(book.id, duration);
        window.location.href = 'dashboard.html';
      } catch (error) {
        alert(error.message || 'Failed to rent book');
      } finally {
        setRenting(false);
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-[var(--bg-light)]">
          <Header />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      );
    }

    if (!book) return null;

    return (
      <div className="min-h-screen bg-[var(--bg-light)]">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* --- THIS LINE IS UPDATED --- */}
          <div className="bg-[var(--navbar-color)] rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              <div>
                
                <h1 className="text-4xl font-bold text-white mb-4">{book.title}</h1>
                <p className="text-xl text-gray-200 mb-6">by {book.author}</p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1 text-amber-500">
                    <div className="icon-star text-lg"></div>
                    <span className="font-semibold text-gray-200">{book.rating || '4.5'}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-300">{book.pages} pages</span>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">{book.description}</p>

                
                <div className="bg-[var(--card-color)] rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Rental Duration</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { value: 1/24, label: '1 Hour' },
                      { value: 6/24, label: '6 Hours' },
                      { value: 1, label: '1 Day' },
                      { value: 4, label: '4 Days' },
                      { value: 7, label: '1 Week' },
                      { value: 14, label: '2 Weeks' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCustomMode(false);
                          setSelectedDuration(option.value);
                        }}

                        className={`p-3 rounded-lg border-2 transition-all ${
                          !customMode && selectedDuration === option.value
                            ? 'border-[var(--primary-color)] bg-purple-50'
                            : 'border-transparent bg-[var(--card-bg-color)] hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">{option.label}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          ₹{calculatePrice(option.value)}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <button
                      onClick={() => setCustomMode(!customMode)}
                      className={`w-full p-3 rounded-lg border-2 transition-all ${
                        customMode
                          ? 'border-[var(--primary-color)] bg-purple-50'
                          : 'border-transparent bg-[var(--card-bg-color)] hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-sm">Custom Duration</div>
                    </button>

                    {customMode && (
                      <div className="mt-4 space-y-3">
                        <div className="flex gap-3">
                          <input
                            type="number"
                            min="1"
                            value={customValue}
                            onChange={(e) => setCustomValue(parseInt(e.target.value) || 1)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                          />
                          <select
                            value={customUnit}
                            onChange={(e) => setCustomUnit(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
                          >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            <option value="months">Months</option>
                          </select>
                        </div>
                        <div className="text-sm text-[var(--text-secondary)]">
                          Total: ₹{calculatePrice(calculateCustomDuration())}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={handleRent}
                  disabled={renting}
                  className="w-full btn-primary text-lg"
                >
                  {renting ? 'Processing...' : 'Rent Now'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('BookDetailApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookDetailApp />);








































