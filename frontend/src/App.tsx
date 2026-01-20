import { useEffect, useState } from 'react';
import './App.css';

// SVG Icons as components for cleaner JSX
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

type Game = {
  id: number;
  title: string;
  platform: string;
  price: number;
  currency: string;
  discount: number;
  cashback: number;
  imageUrl: string;
  store: string;
  region: string;
  likes?: number; // Optional in case API adds it later
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');

  const fetchGames = (query = '') => {
    // Using the URL you provided
    const url = query
      ? `https://search-app-wmbq.onrender.com/list?search=${encodeURIComponent(query)}`
      : 'https://search-app-wmbq.onrender.com/list';

    fetch(url)
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Error fetching games:", err));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Helper to calculate original price based on discount
  const getOriginalPrice = (price: number, discount: number) => {
    if (!discount) return null;
    return (price / (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">en<span>eba</span></div>
        
        <div className="search-container">
          <span className="search-icon"><SearchIcon /></span>
          <input
            className="search"
            placeholder="Search for games, gift cards..."
            value={search}
            onChange={e => {
              const value = e.target.value;
              setSearch(value);
              fetchGames(value);
            }}
          />
        </div>

        <div className="header-icons">
          <button className="icon-btn"><HeartIcon /></button>
          <button className="icon-btn"><CartIcon /></button>
        </div>
      </header>

      <span className="results-count">Results found: {games.length}</span>

      <main className="grid">
        {games.map(game => (
          <div key={game.id} className="card">
            
            {/* Image Section with Overlays */}
            <div className="card-image-wrapper">
              <img src={game.imageUrl} alt={game.title} />
              
              {/* Cashback Badge */}
              {game.cashback > 0 && (
                <div className="cashback-badge">
                  <span>↩</span> 
                  <span>CASHBACK</span>
                </div>
              )}

              {/* Platform Strip */}
              <div className="platform-strip">
                <span style={{fontSize: '10px', color: '#fff', fontWeight: 'bold'}}>
                  {game.platform === 'PC' ? 'EA App' : 'Xbox Live'} {/* Mocking specific store text */}
                </span>
                <span className="region-badge">{game.region}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="card-content">
              <h3>{game.title}</h3>

              <div className="price-container">
                {game.discount > 0 && (
                  <div className="original-price-row">
                    <span>From</span>
                    <span style={{ textDecoration: 'line-through' }}>
                      €{getOriginalPrice(game.price, game.discount)}
                    </span>
                    <span className="discount-tag">-{game.discount}%</span>
                  </div>
                )}
                
                <div className="final-price">
                  {game.price} {game.currency}
                </div>

                <div className="cashback-info">
                  Cashback: €{game.cashback}
                </div>
              </div>

              <div className="card-footer">
                <div className="heart-icon">
                   <HeartIcon /> 
                   <span>{Math.floor(Math.random() * 900) + 100}</span> {/* Mock like count */}
                </div>
                <div style={{fontSize: '10px', color: '#888'}}>Digital Key</div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;