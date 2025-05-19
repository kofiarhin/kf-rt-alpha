import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const sampleText = [
  'The quick brown fox jumps over the lazy dog',
  'Typing games improve your speed and accuracy',
  'React is a powerful JavaScript library for building UIs'
];

const getRandomText = () => sampleText[Math.floor(Math.random() * sampleText.length)];

function App() {
  const [targetText, setTargetText] = useState(getRandomText());
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value === targetText) {
      setEndTime(Date.now());
      setIsFinished(true);
    }

    setUserInput(value);
  };

  const getWPM = () => {
    const words = targetText.trim().split(/\s+/).length;
    const minutes = (endTime - startTime) / 60000;
    return Math.round(words / minutes);
  };

  const restartGame = () => {
    setTargetText(getRandomText());
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    inputRef.current.focus();
  };

  const renderColoredText = () => {
    return targetText.split('').map((char, i) => {
      let color;
      if (i < userInput.length) {
        color = char === userInput[i] ? 'green' : 'red';
      } else {
        color = 'gray';
      }

      return (
        <span key={i} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <p>{renderColoredText()}</p>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        disabled={isFinished}
        style={{ width: '100%', padding: '10px', fontSize: '1.2rem' }}
      />
      {isFinished && (
        <div>
          <h2>WPM: {getWPM()}</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;