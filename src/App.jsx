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

      <p><strong>Scrambled Word:</strong> {scrambled}</p>
      <p><strong>Hint:</strong> {current.hint}</p>

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

      {message && <p>{message}</p>}
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
  input: {
    padding: '10px',
    width: '80%',
    fontSize: '1rem',
    marginBottom: '20px',
    border: '1px solid #000',
    outline: 'none',
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
  },
};

export default App;