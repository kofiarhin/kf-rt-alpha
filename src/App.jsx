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
  const [jumpIndex, setJumpIndex] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (isFinished) return;

    const nextChar = targetText[userInput.length];

    if (!startTime) setStartTime(Date.now());

    if (e.key === nextChar) {
      const newInput = userInput + e.key;
      setUserInput(newInput);
      setJumpIndex(userInput.length);

      setTimeout(() => setJumpIndex(null), 300);

      if (newInput === targetText) {
        setEndTime(Date.now());
        setIsFinished(true);
      }
    }

    e.preventDefault(); // Prevent typing incorrect characters
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
    setJumpIndex(null);
    inputRef.current.focus();
  };

  const renderColoredText = () => {
    return targetText.split('').map((char, i) => {
      let color = 'gray';
      let className = '';

      if (i < userInput.length) {
        color = 'green';
        if (i === jumpIndex) className = 'jump';
      }

      return (
        <span key={i} className={className} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <p className="prompt">{renderColoredText()}</p>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onKeyDown={handleKeyDown}
        onChange={() => {}} // prevent React warning
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