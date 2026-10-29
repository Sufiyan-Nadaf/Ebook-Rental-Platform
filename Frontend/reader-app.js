// components/reader-app.js
function ReaderApp() {
  try {
    // --- STATE ---
    const [rental, setRental] = React.useState(null);
    const [pdfUrl, setPdfUrl] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    
    // PDF.js State
    const [pdfDoc, setPdfDoc] = React.useState(null);
    const [pageNum, setPageNum] = React.useState(1);
    const [numPages, setNumPages] = React.useState(0);
    const [pageRendering, setPageRendering] = React.useState(false);

    // Ref for the canvas element
    const canvasRef = React.useRef(null);

 

    // 1. Initial check for access and getting the PDF URL
    React.useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }
      
      const params = new URLSearchParams(window.location.search);
      const rentalId = params.get('rentalId');
      
      if (rentalId) {
        checkAccess(rentalId);
      } else {
        setError('No rental specified.');
        setLoading(false);
      }
    }, []);

    // 2. Load the PDF document using PDF.js once we have the URL
    React.useEffect(() => {
      if (!pdfUrl) return;

      // Set the worker source (required for PDF.js)
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

      setLoading(true);
      const loadingTask = pdfjsLib.getDocument({ 
        url: pdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
        cMapPacked: true,
      });

      loadingTask.promise.then(
        (doc) => {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setLoading(false);
        },
        (reason) => {
          console.error('Error loading PDF:', reason);
          setError('Failed to load the PDF document.');
          setLoading(false);
        }
      );
    }, [pdfUrl]);

    // 3. Render the current page whenever pdfDoc or pageNum changes
    React.useEffect(() => {
      if (!pdfDoc) return;
      
      renderPage(pageNum);

    }, [pdfDoc, pageNum]);

    // 4. Add keyboard shortcuts (Left/Right arrows)
    React.useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrevPage();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNextPage();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      
      // Cleanup function to remove the listener
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [pdfDoc, pageNum, pageRendering]); // Re-bind to get the latest state


    // 5. Add a timer to check for rental expiry
    React.useEffect(() => {
      if (rental && rental.expiryDate) {
        // Check every 10 seconds
        const interval = setInterval(() => {
          const now = new Date();
          const expiry = new Date(rental.expiryDate);
          
          if (now > expiry) {
            // Rental has expired!
            setError('Your rental period has ended.');
            setPdfDoc(null); // Clear the doc
            clearInterval(interval); // Stop the timer
          }
        }, 10000); // 10000ms = 10 seconds

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }
    }, [rental]); // Run this effect when the rental object is loaded



    // --- API CALL ---
    const checkAccess = async (rentalId) => {
      try {
        const response = await API.getAccessUrl(rentalId);
        setRental(response.rental);
        
        if (response.hasAccess) {
          setPdfUrl(response.access_url);
        } else {
          setError('Your rental period has ended.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Access check failed:', err);
        setError(err.message || 'Failed to load book. Please try again.');
        setLoading(false);
      }
    };

    // --- PDF.js HELPER FUNCTIONS ---

    const renderPage = (num) => {
      if (!pdfDoc) return;
      if (pageRendering) return; // Prevent concurrent renders
      setPageRendering(true);

      pdfDoc.getPage(num).then((page) => {
        const canvas = canvasRef.current;
        if (!canvas) return; 

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        if (!container) return;

        const desiredWidth = container.clientWidth * 0.95; 
        const viewport = page.getViewport({ scale: 1 });
        const scale = desiredWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale: scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport,
        };

        const renderTask = page.render(renderContext);
        renderTask.promise.then(() => {
          setPageRendering(false);
        });
      });
    };


    const goToPrevPage = () => {
      if (pageNum <= 1 || pageRendering) return;
      setPageNum(pageNum - 1);
    };

    const goToNextPage = () => {
      if (pageNum >= numPages || pageRendering) return;
      setPageNum(pageNum + 1);
    };

    // --- RENDER LOGIC ---

    // Initial loading screen (before API call)
    if (loading && !pdfDoc) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading Book...</p>
          </div>
        </div>
      );
    }

    // Error / Access Denied screen
    // This will now also show when the timer sets the error
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-red-600 icon-lock"></span>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Access Denied</h1>
            <p className="text-[var(--text-secondary)] mb-8">
              {error}
            </p>
            <a href="dashboard.html" className="inline-block px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
              Go to Dashboard
            </a>
          </div>
        </div>
      );
    }

    // The main PDF Reader UI
    return (
      <div className="flex flex-col h-screen bg-gray-800">
        {/* Header bar */}
        <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-4">
            <a href="dashboard.html" className="hover:text-gray-300" title="Back to Dashboard">
              <span className="icon-arrow-left"></span>
            </a>
            <h1 className="font-semibold truncate">{rental?.book?.title}</h1>
          </div>
          {/* Page counter */}
          <div className="text-sm">
            Page <span>{pageNum}</span> / <span>{numPages}</span>
            {pageRendering && <span className="animate-pulse ml-2">...</span>}
          </div>
        </div>

        {/* PDF Reader Area: Renders onto a <canvas> */}
        <div className="flex-1 w-full overflow-y-auto flex justify-center py-4">
          <canvas id="pdf-canvas" ref={canvasRef}></canvas>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-center space-x-8 z-50">
          <button
            onClick={goToPrevPage}
            disabled={pageNum <= 1 || pageRendering}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-[var(--primary-color)] text-white font-medium hover:opacity-90 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <span className="icon-chevron-left"></span>
            <span>Previous</span>
          </button>
          
          <span className="text-lg font-bold">
            {pageNum}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={pageNum >= numPages || pageRendering}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-[var(--primary-color)] text-white font-medium hover:opacity-90 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <span className="icon-chevron-right"></span>
          </button>
        </div>
      </div>
    );

  } catch (error) {
    console.error('ReaderApp error:', error);
    return (
      <div className="p-4 text-red-500">
        A critical error occurred: {error.message}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReaderApp />);