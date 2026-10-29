function Hero() {
 try {
    return (
      // --- UPDATED: Background color and default text color ---
      <section className="bg-[var(--secondary-color)] text-[var(--text-primary)] py-20" data-name="hero" data-file="components/Hero.js">
        <div className="max-w-7xl mx-auto px-4 text-center">
          
          {/* --- UPDATED: Text color --- */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Rent eBooks, Read Anywhere</h1>
          <p className="text-xl md:text-2xl mb-8 text-[var(--text-secondary)]">Access thousands of books for a fixed duration. No subscriptions, just rent what you need.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            
            {/* --- UPDATED: Button styles --- */}
            <a href="browse.html" className="btn-primary bg-[var(--primary-color)] text-[var(--card-color)] hover:opacity-90">
              Browse Books
            </a>
            <a href="#how-it-works" className="btn-secondary border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-[var(--text-primary)]">
              Learn More
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              {/* --- UPDATED: Text colors --- */}
              <div className="text-4xl font-bold mb-2 text-[var(--text-primary)]">10K+</div>
              <div className="text-[var(--text-secondary)]">Books Available</div>
            </div>
            <div>
              {/* --- UPDATED: Text colors --- */}
              <div className="text-4xl font-bold mb-2 text-[var(--text-primary)]">50K+</div>
              <div className="text-[var(--text-secondary)]">Happy Readers</div>
            </div>
            <div>
              {/* --- UPDATED: Text colors --- */}
              <div className="text-4xl font-bold mb-2 text-[var(--text-primary)]">24/7</div>
              <div className="text-[var(--text-secondary)]">Access</div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}






