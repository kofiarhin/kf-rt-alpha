import React, { useState, useEffect } from 'react';

const words = [
  { word: "subconscious", hint: "Part of the mind that runs in the background" },
  { word: "meditation", hint: "Practice of calming the mind" },
  { word: "visualization", hint: "Mental image of a desired reality" },
  { word: "habit", hint: "A routine or practice done regularly" },
  { word: "affirmation", hint: "Positive statement repeated to change beliefs" },
];

const shuffle = (word) => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

const App = () => {
  const [current, setCurrent] = useState({});
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    getNewWord();
  }, []);

  const getNewWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setCurrent(random);
    setScrambled(shuffle(random.word));
    setGuess('');
    setMessage('');
    setShowAnswer(false);
  };

  const checkGuess = () => {
    if (guess.toLowerCase() === current.word.toLowerCase()) {
      setMessage('Correct!');
    } else {
      setMessage('Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Word Scramble Game</h1>

      <p><strong>Scrambled:</strong> {scrambled}</p>
      <p><strong>Hint:</strong> {current.hint}</p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Your guess"
        style={styles.input}
      />
      <div style={styles.buttonRow}>
        <button onClick={checkGuess} style={styles.button}>Submit</button>
        <button onClick={() => setShowAnswer(true)} style={styles.button}>Reveal Word</button>
        <button onClick={getNewWord} style={styles.button}>Next</button>
      </div>

      {message && <p>{message}</p>}
      {showAnswer && <p><strong>Answer:</strong> {current.word}</p>}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    marginTop: '50px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '80%',
    marginBottom: '1rem',
  },
  buttonRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default App;