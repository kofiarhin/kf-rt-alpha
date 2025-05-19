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
  const [wordList, setWordList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [jumpIndex, setJumpIndex] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    setWordList(targetText.split(' '));
    inputRef.current.focus();
  }, [targetText]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const expectedWord = wordList[currentWordIndex];

      if (typedWord === expectedWord) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
        setJumpIndex(currentWordIndex);

        if (currentWordIndex + 1 === wordList.length) {
          setEndTime(Date.now());
          setIsFinished(true);
        }

        setTimeout(() => setJumpIndex(null), 300);
      } else {
        setUserInput(value); // keep the incorrect word
      }
    } else {
      setUserInput(value);
    }
  };

  const getWPM = () => {
    const words = wordList.length;
    const minutes = (endTime - startTime) / 60000;
    return Math.round(words / minutes);
  };

  const restartGame = () => {
    const newText = getRandomText();
    setTargetText(newText);
    setWordList(newText.split(' '));
    setCurrentWordIndex(0);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setJumpIndex(null);
    inputRef.current.focus();
  };

  const renderWords = () => {
    return wordList.map((word, i) => {
      if (i < currentWordIndex) {
        return (
          <span key={i} className="word correct">
            {word}{' '}
          </span>
        );
      } else if (i === currentWordIndex) {
        return (
          <span key={i} className="word current">
            {renderLiveInputFeedback(word, userInput)}
            {' '}
          </span>
        );
      } else {
        return (
          <span key={i} className="word">
            {word}{' '}
          </span>
        );
      }
    });
  };

  const renderLiveInputFeedback = (expected, typed) => {
    const chars = expected.split('');
    return chars.map((char, i) => {
      let color = 'gray';
      if (i < typed.length) {
        color = typed[i] === char ? 'green' : 'red';
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
      <div className="prompt">{renderWords()}</div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        disabled={isFinished}
        autoComplete="off"
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