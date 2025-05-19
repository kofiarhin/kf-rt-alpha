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
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setWordList(targetText.split(' '));
    inputRef.current.focus();
  }, [targetText]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
      startTimer();
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const expectedWord = wordList[currentWordIndex];
      const isCorrect = typedWord === expectedWord;

      setTypedWords([...typedWords, { typed: typedWord, correct: isCorrect }]);
      setUserInput('');
      setCurrentWordIndex(prev => prev + 1);

      if (currentWordIndex + 1 === wordList.length) {
        setEndTime(Date.now());
        setIsFinished(true);
        stopTimer();
      }
    } else {
      setUserInput(value);
    }
  };

  const getWPM = () => {
    const correctWords = typedWords.filter(w => w.correct).length;
    const minutes = elapsedSeconds / 60;
    return minutes > 0 ? Math.round(correctWords / minutes) : 0;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const restartGame = () => {
    const newText = getRandomText();
    setTargetText(newText);
    setWordList(newText.split(' '));
    setTypedWords([]);
    setCurrentWordIndex(0);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setElapsedSeconds(0);
    inputRef.current.focus();
    clearInterval(timerRef.current);
  };

  const renderWordWithFeedback = (typed, expected) => {
    return expected.split('').map((char, i) => {
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

  const renderWords = () => {
    return wordList.map((word, i) => {
      if (i < typedWords.length) {
        const { typed } = typedWords[i];
        return (
          <span key={i} className="word typed">
            {renderWordWithFeedback(typed, word)}{' '}
          </span>
        );
      } else if (i === typedWords.length) {
        return (
          <span key={i} className="word current">
            {renderWordWithFeedback(userInput, word)}{' '}
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

  return (
    <div className="App">
      <h1>Typing Game</h1>
      <div className="stats">
        <p>Time: {formatTime(elapsedSeconds)}</p>
        <p>WPM: {getWPM()}</p>
      </div>
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
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;