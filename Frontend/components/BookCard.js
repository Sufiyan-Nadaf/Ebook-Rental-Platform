
function BookCard({ book }) {
  try {
    const handleClick = () => {
      window.location.href = `book-detail.html?id=${book.id}`;
    };

    return (
      <div onClick={handleClick} className="book-card" data-name="book-card" data-file="components/BookCard.js">
        <div className="relative">
          <img 
            src={book.coverImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'} 
            alt={book.title}
            className="w-full h-64 object-cover"
            href={book.pdfUrl}
          />
          {book.isNew && (
            <span className="absolute top-2 right-2 bg-[var(--accent-color)] text-white text-xs px-2 py-1 rounded">New</span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-2">{book.author}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-[var(--primary-color)] font-bold">
              ₹{book.rentalPrice}/week
            </div>
            <div className="flex items-center space-x-1 text-amber-500">
              <div className="icon-star text-sm"></div>
              <span className="text-sm">{book.rating || '4.5'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BookCard component error:', error);
    return null;
  }
}