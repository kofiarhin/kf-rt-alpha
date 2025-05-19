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
  const [finalWPM, setFinalWPM] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDifficultySelect = (level) => {
    const time = difficulties[level];
    const text = getRandomText();
    const words = text.split(' ');

    setDifficulty(level);
    setTimeLeft(time);
    setTargetText(text);
    setWordList(words);
    setTypedWords([]);
    setUserInput('');
    setCurrentWordIndex(0);
    setIsStarted(true);
    setIsFinished(false);
    setFinalWPM(0);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishGame();
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

      const updatedWords = [...typedWords, { typed: typedWord, correct: isCorrect }];
      setTypedWords(updatedWords);
      setUserInput('');
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);

      if (nextIndex === wordList.length) {
        clearInterval(timerRef.current);
        finishGame(updatedWords);
      }
    } else {
      setUserInput(value);
    }
  };

  const finishGame = (finalWords = typedWords) => {
    setIsFinished(true);
    const correctWords = finalWords.filter(w => w.correct).length;
    const totalTime = difficulties[difficulty];
    const wpm = Math.round((correctWords / totalTime) * 60);
    setFinalWPM(wpm);
  };

  const getWPM = () => finalWPM;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const restartGame = () => {
    handleDifficultySelect(difficulty);
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setDifficulty(null);
    setTimeLeft(0);
    setTargetText('');
    setWordList([]);
    setTypedWords([]);
    setUserInput('');
    setCurrentWordIndex(0);
    setIsStarted(false);
    setIsFinished(false);
    setFinalWPM(0);
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
            <div className="result">
              <h2>Game Over</h2>
              <h3>Your WPM: {getWPM()}</h3>
              <button onClick={restartGame}>Restart (Same Difficulty)</button>
              <button onClick={resetGame}>Change Difficulty</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;