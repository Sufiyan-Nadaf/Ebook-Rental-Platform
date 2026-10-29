// components/RentalCard.js

/**
 * A helper function to calculate time remaining.
 * @param {string} expiryDateISO - The ISO string of the expiry date from the backend.
 * @returns {object} - An object with days, hours, minutes, seconds, and total milliseconds.
 */
function calculateTimeRemaining(expiryDateISO) {
  const expiryTime = new Date(expiryDateISO).getTime();
  const now = new Date().getTime();
  const distance = expiryTime - now;

  if (distance <= 0) {
    // Return all zeros if expired
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { total: distance, days, hours, minutes, seconds };
}

function RentalCard({ rental }) {
  // State to hold the time remaining
  const [timeLeft, setTimeLeft] = React.useState(
    calculateTimeRemaining(rental.expiryDate)
  );

  React.useEffect(() => {
    // Don't start a timer if it's already expired on load
    if (timeLeft.total <= 0) {
      return;
    }

    // Set up an interval to update the timer every second
    const timerInterval = setInterval(() => {
      const newTimeLeft = calculateTimeRemaining(rental.expiryDate);
      setTimeLeft(newTimeLeft);

      // Stop the timer once it reaches zero
      if (newTimeLeft.total <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000); // 1000ms = 1 second

    // Clear the interval when the component unmounts (cleans up)
    return () => {
      clearInterval(timerInterval);
    };
  }, [rental.expiryDate]); 

  const isExpired = timeLeft.total <= 0;

  return (
    // --- THIS IS THE UPDATED CARD LAYOUT ---
    <div className="flex bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <img
        src={rental.book.coverImage}
        alt={rental.book.title}
        className="w-24 h-36 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">{rental.book.title}</h3>
          <p className="text-sm text-[var(--text-secondary)]">by {rental.book.author}</p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="font-medium">
            {isExpired ? (
              <span className="text-red-500">Expired</span>
            ) : (
              <span className="text-[var(--text-secondary)] text-sm">
                Expires in: 
                <strong className="text-[var(--text-primary)] ml-1">
                  {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                </strong>
              </span>
            )}
          </div>

          {!isExpired ? (
            <a
              href={`reader.html?rentalId=${rental._id}`}
              className="px-4 py-2 bg-[var(--primary-color)] text-white text-sm rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Read Now
            </a>
          ) : (
            <button 
              disabled 
              className="px-4 py-2 bg-gray-200 text-gray-500 text-sm rounded-lg font-medium cursor-not-allowed"
            >
              Expired
            </button>
          )}
        </div>
      </div>
    </div>
  );
}