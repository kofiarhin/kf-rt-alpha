import React, { useState, useEffect } from 'react';

const words = [
  { word: "subconscious", hint: "Part of the mind that runs in the background" },
  { word: "meditation", hint: "Practice of calming the mind" },
  { word: "visualization", hint: "Mental image of a desired reality" },
  { word: "habit", hint: "A routine or practice done regularly" },
  { word: "affirmation", hint: "Positive statement repeated to change beliefs" },
];

const shuffle = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

const App = () => {
  const [current, setCurrent] = useState({ word: '', hint: '' });
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    getNewWord();
  }, []);

  const getNewWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    const scrambledWord = shuffle(random.word);
    setCurrent(random);
    setScrambled(scrambledWord);
    setGuess('');
    setMessage('');
    setShowAnswer(false);
    setFadeKey(prev => prev + 1); // Triggers re-animation
  };

  const checkGuess = () => {
    if (guess.trim().toLowerCase() === current.word.toLowerCase()) {
      setMessage('Correct!');
    } else {
      setMessage('Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Word Scramble</h1>

      <div key={fadeKey} style={styles.fadeIn}>
        <p><strong>Scrambled Word:</strong> {scrambled}</p>
        <p><strong>Hint:</strong> {current.hint}</p>
      </div>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Type your guess"
        style={styles.input}
      />

      <div style={styles.buttonRow}>
        <button onClick={checkGuess} style={styles.button}>Submit</button>
        <button onClick={() => setShowAnswer(true)} style={styles.button}>Reveal</button>
        <button onClick={getNewWord} style={styles.button}>Next</button>
      </div>

      {message && <p style={styles.message}>{message}</p>}
      {showAnswer && <p><strong>Answer:</strong> {current.word}</p>}
    </div>
  );
};

const styles = {
  container: {
    color: '#000',
    backgroundColor: '#fff',
    padding: '40px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  fadeIn: {
    animation: 'fadeIn 0.6s ease-in-out',
  },
  input: {
    padding: '10px',
    width: '80%',
    fontSize: '1rem',
    marginBottom: '20px',
    border: '1px solid #000',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  },
  message: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

// Add global styles manually or in your CSS file
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  input:focus {
    border-color: #666;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  button:hover {
    transform: scale(1.05);
    background-color: #333;
  }
`, styleSheet.cssRules.length);

export default App;