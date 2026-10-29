// function DashboardApp() {
//   try {
//     const [user, setUser] = React.useState(null);
//     const [rentals, setRentals] = React.useState([]);
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         window.location.href = 'login.html';
//         return;
//       }
      
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
      
//       fetchRentals();
//     }, []);

//     const fetchRentals = async () => {
//       try {
//         const data = await API.getMyRentals();
//         setRentals(data);
//       } catch (error) {
//         console.error('Failed to fetch rentals:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!user) return null;

//     return (
//       <div className="min-h-screen bg-[var(--bg-light)]">
//         <Header />
        
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">My Dashboard</h1>
//             <p className="text-[var(--text-primary)]">Welcome back, {user.name}!</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {/* --- THIS LINE IS UPDATED --- */}
//             <div className="bg-[var(--card-color)] rounded-xl p-6 shadow-sm">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <div className="icon-book text-xl text-[var(--primary-color)]"></div>
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold text-[var(--text-primary)]">{rentals.length}</p>
//                   <p className="text-sm text-[var(--text-secondary)]">Active Rentals</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* --- THIS LINE IS UPDATED --- */}
//           <div className="bg-[var(--card-color)] rounded-xl shadow-sm p-6">
//             <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Rentals</h2>
            
//             {loading ? (
//               <div className="space-y-4">
//                 {[1,2,3].map(i => (
//                   <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
//                 ))}
//               </div>
//             ) : rentals.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-[var(--text-secondary)] mb-4">You don't have any rentals yet</p>
//                 <a href="browse.html" className="btn-primary">Browse Books</a>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {rentals.map(rental => (
//                   <RentalCard key={rental.id} rental={rental} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <Footer />
//       </div>
//     );
//   } catch (error) {
//     console.error('DashboardApp error:', error);
//     return null;
//   }
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<DashboardApp />);
















// function DashboardApp() {
//   try {
//     const [user, setUser] = React.useState(null);
    
//     // --- NEW STATES ---
//     // We will split rentals into two lists
//     const [activeRentals, setActiveRentals] = React.useState([]);
//     const [expiredRentals, setExpiredRentals] = React.useState([]);
//     // --- END NEW STATES ---
    
//     const [loading, setLoading] = React.useState(true);

//     React.useEffect(() => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         window.location.href = 'login.html';
//         return;
//       }
      
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
      
//       fetchRentals();
//     }, []);

//     const fetchRentals = async () => {
//       try {
//         const allRentals = await API.getMyRentals();
        
//         // --- NEW LOGIC: Split the rentals ---
//         const now = new Date();
//         const active = [];
//         const expired = [];

//         allRentals.forEach(rental => {
//           if (new Date(rental.expiryDate) > now) {
//             active.push(rental);
//           } else {
//             expired.push(rental);
//           }
//         });

//         // Sort active rentals by expiry date (soonest to expire first)
//         active.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
//         // Sort expired rentals by expiry date (most recent first)
//         expired.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));

//         setActiveRentals(active);
//         setExpiredRentals(expired);
//         // --- END NEW LOGIC ---

//       } catch (error) {
//         console.error('Failed to fetch rentals:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!user) return null;

//     return (
//       <div className="min-h-screen bg-[var(--bg-light)]">
//         <Header />
        
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">My Dashboard</h1>
//             <p className="text-[var(--text-secondary)]">Welcome back, {user.name}!</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-xl p-6 shadow-sm">
//               <div className="flex items-center space-x-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <div className="icon-book text-xl text-[var(--primary-color)]"></div>
//                 </div>
//                 <div>
//                   {/* --- FIX: Use activeRentals.length --- */}
//                   <p className="text-2xl font-bold text-[var(--text-primary)]">{activeRentals.length}</p>
//                   {/* --- END FIX --- */}
//                   <p className="text-sm text-[var(--text-secondary)]">Active Rentals</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* --- MODIFIED SECTION: Now for ACTIVE Rentals --- */}
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//             <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Active Rentals</h2>
            
//             {loading ? (
//               <div className="space-y-4">
//                 {[1,2].map(i => (
//                   <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
//                 ))}
//               </div>
//             ) : activeRentals.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-[var(--text-secondary)] mb-4">You don't have any active rentals.</p>
//                 <a href="browse.html" className="btn-primary">Browse Books</a>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {activeRentals.map(rental => (
//                   <RentalCard key={rental.id} rental={rental} />
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* --- END MODIFIED SECTION --- */}

//           {/* --- NEW SECTION: Past Rentals --- */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Past Rentals</h2>
            
//             {loading ? (
//               <div className="space-y-4">
//                 <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
//               </div>
//             ) : expiredRentals.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-[var(--text-secondary)]">You don't have any past rentals.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {expiredRentals.map(rental => (
//                   <RentalCard key={rental.id} rental={rental} />
//                 ))}
//               </div>
//             )}
//           </div>
//           {/* --- END NEW SECTION --- */}

//         </div>

//         <Footer />
//       </div>
//     );
//   } catch (error) {
//     console.error('DashboardApp error:', error);
//     return null;
//   }
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<DashboardApp />);
























function DashboardApp() {
  try {
    const [user, setUser] = React.useState(null);
    const [activeRentals, setActiveRentals] = React.useState([]);
    const [expiredRentals, setExpiredRentals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }
      
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      
      fetchRentals();
    }, []);

    const fetchRentals = async () => {
      try {
        const allRentals = await API.getMyRentals();
        
        const now = new Date();
        const active = [];
        const expired = [];

        allRentals.forEach(rental => {
          if (new Date(rental.expiryDate) > now) {
            active.push(rental);
          } else {
            expired.push(rental);
          }
        });

        active.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
        expired.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));

        setActiveRentals(active);
        setExpiredRentals(expired);

      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) return null;

    return (
      <div className="min-h-screen bg-[var(--bg-light)]">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">My Dashboard</h1>
            <p className="text-[var(--text-primary)]">Welcome back, {user.name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* --- CARD COLOR CHANGED HERE --- */}
            <div className="bg-[#EBCB90] rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="icon-book text-xl text-[var(--primary-color)]"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{activeRentals.length}</p>
                  <p className="text-sm text-[var(--text-secondary)]">Active Rentals</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- CARD COLOR CHANGED HERE --- */}
          <div className="bg-[#EBCB90] rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Active Rentals</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : activeRentals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)] mb-4">You don't have any active rentals.</p>
                <a href="browse.html" className="btn-primary">Browse Books</a>
              </div>
            ) : (
              <div className="space-y-4">
                {activeRentals.map(rental => (
                  <RentalCard key={rental.id} rental={rental} />
                ))}
              </div>
            )}
          </div>

          {/* --- CARD COLOR CHANGED HERE --- */}
          <div className="bg-[#EBCB90] rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Past Rentals</h2>
            
            {loading ? (
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ) : expiredRentals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">You don't have any past rentals.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {expiredRentals.map(rental => (
                  <RentalCard key={rental.id} rental={rental} />
                ))}
              </div>
            )}
          </div>
          
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('DashboardApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DashboardApp />);