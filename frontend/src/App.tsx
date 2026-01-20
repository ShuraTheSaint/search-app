import { useEffect, useState } from 'react';
import './App.css';

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
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');

  const fetchGames = (query = '') => {
    const url = query
      ? `http://localhost:3000/list?search=${encodeURIComponent(query)}`
      : 'http://localhost:3000/list';

    fetch(url)
      .then(res => res.json())
      .then(data => setGames(data));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <input
          className="search"
          placeholder="Search games"
          value={search}
          onChange={e => {
            const value = e.target.value;
            setSearch(value);
            fetchGames(value);
          }}
        />
      </header>

      <main className="grid">
        {games.map(game => (
          <div key={game.id} className="card">
            <img src={game.imageUrl} alt={game.title} />
            <h3>{game.title}</h3>

            <div className="price">
              {game.price} {game.currency}
            </div>

            <div className="meta">
              <span>-{game.discount}%</span>
              <span>Cashback {game.cashback}</span>
            </div>

            <div className="footer">
              <span>{game.platform}</span>
              <span>{game.store}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
