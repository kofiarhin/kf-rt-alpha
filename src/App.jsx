import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const sampleText = [
  'The quick brown fox jumps over the lazy dog',
  'Typing games improve your speed and accuracy',
  'React is a powerful JavaScript library for building UIs',
  'Discipline is the bridge between goals and accomplishment',
  'Knowledge is power but enthusiasm pulls the switch'
];

const difficulties = {
  easy: 120,
  medium: 60,
  hard: 30
};

const getRandomText = () => sampleText[Math.floor(Math.random() * sampleText.length)];

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetText, setTargetText] = useState('');
  const [wordList, setWordList] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDifficultySelect = (level) => {
    const time = difficulties[level];
    setDifficulty(level);
    setTimeLeft(time);
    setTargetText(getRandomText());
    setIsStarted(true);
    setIsFinished(false);
    setTypedWords([]);
    setUserInput('');
    setCurrentWordIndex(0);
    setWordList(getRandomText().split(' '));

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleChange = (e) => {
    if (isFinished) return;

    const value = e.target.value;

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const expectedWord = wordList[currentWordIndex];
      const isCorrect = typedWord === expectedWord;

      setTypedWords([...typedWords, { typed: typedWord, correct: isCorrect }]);
      setUserInput('');
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setUserInput(value);
    }
  };

  const getWPM = () => {
    const correctWords = typedWords.filter(w => w.correct).length;
    const minutes = difficulties[difficulty] / 60;
    return Math.round(correctWords / minutes);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const restartGame = () => {
    clearInterval(timerRef.current);
    setDifficulty(null);
    setIsStarted(false);
    setIsFinished(false);
    setUserInput('');
    setTypedWords([]);
    setTimeLeft(0);
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

      {!isStarted && (
        <div className="difficulty-select">
          <h2>Select Difficulty</h2>
          <button onClick={() => handleDifficultySelect('easy')}>Easy (2 min)</button>
          <button onClick={() => handleDifficultySelect('medium')}>Medium (1 min)</button>
          <button onClick={() => handleDifficultySelect('hard')}>Hard (30 sec)</button>
        </div>
      )}

      {isStarted && (
        <>
          <div className="stats">
            <p>Time Left: {formatTime(timeLeft)}</p>
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
              <h2>Time's Up!</h2>
              <h3>Your WPM: {getWPM()}</h3>
              <button onClick={restartGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;