import React from 'react';
import './App.css';

const warMovies = [
  {
    title: 'Warfare',
    year: 2025,
    platform: 'A24',
    description: 'Raw, unfiltered modern combat. One of the most brutally realistic war films in years.',
  },
  {
    title: 'Civil War',
    year: 2024,
    director: 'Alex Garland',
    description: 'A fractured America. A team of war journalists. Feels disturbingly plausible.',
  },
  {
    title: 'Blitz',
    year: 2024,
    director: 'Steve McQueen',
    description: 'A mother and son surviving the London bombings. Emotionally brutal and grounded.',
  },
  {
    title: 'The Ministry of Ungentlemanly Warfare',
    year: 2024,
    director: 'Guy Ritchie',
    description: 'WWII covert ops unit. Stylish, violent, and darkly funny.',
  },
  {
    title: 'The Six Triple Eight',
    year: 2024,
    director: 'Tyler Perry',
    description: 'All-Black, all-female WWII battalion. Long-overdue recognition.',
  },
  {
    title: 'Sky Force',
    year: 2025,
    origin: 'India',
    description: 'Akshay Kumar leads India’s first airstrike reenactment. High altitude and high tension.',
  },
  {
    title: 'Uprising',
    year: 2024,
    origin: 'South Korea',
    description: 'Japanese invasions of Korea. Brotherhood and betrayal at war’s edge.',
  },
  {
    title: 'World War III',
    year: 2025,
    genre: 'Speculative',
    description: 'A global conflict scenario with psychological and strategic depth.',
  },
  {
    title: 'Valiant One',
    year: 2025,
    description: 'Behind enemy lines with one military unit. Tight, tense, and raw.',
  },
  {
    title: 'Number 24',
    year: 2025,
    type: 'Biographical',
    description: 'A soldier’s personal journey through war. Deep and character-driven.',
  },
];

const App = () => {
  return (
    <div className="blog-container">
      <h1>🔥 Top 10 War Movies You Need to Watch (2024–2025)</h1>
      <p className="intro">
        If you're a war film junkie looking for the latest heat, here’s the no-BS list of the best war films from
        the last two years. Raw battlefields, fractured nations, and real consequences.
      </p>
      <ol className="movie-list">
        {warMovies.map((movie, index) => (
          <li key={index} className="movie-item">
            <h2>{index + 1}. {movie.title} ({movie.year})</h2>
            {movie.platform && <p><strong>Platform:</strong> {movie.platform}</p>}
            {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
            {movie.origin && <p><strong>Origin:</strong> {movie.origin}</p>}
            {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
            {movie.type && <p><strong>Type:</strong> {movie.type}</p>}
            <p>{movie.description}</p>
          </li>
        ))}
      </ol>
      <p className="outro">
        Whether you want historical realism, dystopian chaos, or psychological intensity, this lineup has it covered.
        Add them to your watchlist. Then thank me later.
      </p>
    </div>
  );
};

export default App;