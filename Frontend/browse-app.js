function BrowseApp() {
  try {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filters, setFilters] = React.useState({
      genre: '',
      sortBy: 'popular'
    });

    React.useEffect(() => {
      fetchBooks();
    }, [filters]);

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await API.getBooks(filters);
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleSearch = (e) => {
      e.preventDefault();
      fetchBooks();
    };

    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-[var(--bg-light)]">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Browse Books</h1>
          
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                {/* --- UPDATED SEARCH BAR --- */}
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-[var(--card-color)] text-gray-800 placeholder:text-gray-700 border border-transparent rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                {/* --- UPDATED ICON COLOR --- */}
                <div className="icon-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 text-xl"></div>
              </div>
            </div>
            
            {/* --- UPDATED DROPDOWN --- */}
            <select
              value={filters.genre}
              onChange={(e) => setFilters({...filters, genre: e.target.value})}
              className="px-4 py-3 bg-[var(--card-color)] text-gray-800 border border-transparent rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="book-card h-96 animate-pulse bg-gray-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('BrowseApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowseApp />);