import React from 'react';
import './App.css';

const trendingMovies = [
  {
    title: 'Nonnas',
    description: 'A heartfelt comedy-drama starring Vince Vaughn about a Brooklyn man who opens a restaurant staffed by Italian grandmothers.',
  },
  {
    title: 'Paddington in Peru',
    description: 'The third installment in the beloved family franchise, following Paddington Bear’s journey back to his roots.',
  },
  {
    title: 'Beetlejuice Beetlejuice',
    description: 'A long-awaited sequel with Michael Keaton and Winona Ryder. Gothic style meets modern family adventure.',
  },
  {
    title: 'Havoc',
    description: 'Tom Hardy stars in this gritty crime-thriller about a detective navigating an underworld to save a politician’s son.',
  },
  {
    title: 'Fear Street: Prom Queen',
    description: 'A horror flick set in 1988 where a prom campaign turns into a deadly game in a cursed town.',
  },
  {
    title: 'Kinda Pregnant',
    description: 'A comedy starring Amy Schumer pretending to be pregnant—and accidentally changing lives.',
  },
  {
    title: 'Revelations',
    description: 'A dark South Korean psychological thriller based on a webtoon, filled with twists and mind games.',
  },
  {
    title: 'The Life List',
    description: 'A feel-good journey of rediscovery when a woman revisits her childhood dreams after her mother’s passing.',
  },
  {
    title: 'Plankton: The Movie',
    description: 'Everyone’s favorite one-eyed villain from SpongeBob gets his own bizarre underwater adventure.',
  },
  {
    title: 'Heart Eyes',
    description: 'Romance and horror collide in this slasher about a killer who stalks with glowing heart-shaped eyes.',
  },
];

const App = () => {
  return (
    <div className="blog-container">
      <h1>🔥 Top 10 Trending Movies on Netflix (May 2025)</h1>
      <p className="intro">
        Looking for what’s hot right now on Netflix? These 10 picks are trending in the UK and worth your screen time.
      </p>
      <ol className="movie-list">
        {trendingMovies.map((movie, index) => (
          <li key={index} className="movie-item">
            <h2>{index + 1}. {movie.title}</h2>
            <p>{movie.description}</p>
          </li>
        ))}
      </ol>
      <p className="outro">
        Whether you're in the mood for horror, humor, drama, or heart, this lineup has something fire. Watch them while they’re still trending.
      </p>

      <footer className="footer">
        <p>Created by Kofi Arhin</p>
      </footer>
    </div>
  );
};

export default App;