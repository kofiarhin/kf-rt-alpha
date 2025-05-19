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
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetText, setTargetText] = useState('');
  const [wordList, setWordList] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [finalWPM, setFinalWPM] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDifficultySelect = (level) => {
    const text = getRandomText();
    const time = difficulties[level];
    setDifficulty(level);
    setTotalTime(time);
    setTimeLeft(time);
    setTargetText(text);
    setWordList(text.split(' '));
    setTypedWords([]);
    setUserInput('');
    setCurrentWordIndex(0);
    setIsStarted(true);
    setIsFinished(false);
    setFinalWPM(0);
    setTimerStarted(false);
    setScore(0);
    setIsGameOver(false);
    clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const startTimer = () => {
    if (timerStarted) return;
    setTimerStarted(true);
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
  };

  const handleChange = (e) => {
    if (isFinished || isGameOver) return;

    const value = e.target.value;
    if (!timerStarted) startTimer();

    const expected = wordList[currentWordIndex] || '';
    const lastCharIndex = value.length - 1;
    const lastCharTyped = value[lastCharIndex];
    const expectedChar = expected[lastCharIndex];

    // scoring per character
    if (lastCharTyped !== undefined) {
      if (lastCharTyped === expectedChar) {
        setScore(prev => prev + 1);
      } else {
        setScore(prev => {
          const newScore = prev - 2;
          if (newScore < 0) {
            clearInterval(timerRef.current);
            setIsGameOver(true);
            setIsFinished(true);
          }
          return newScore;
        });
      }
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const isCorrect = typedWord === expected;

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
    const usedTime = totalTime - timeLeft;
    const wpm = Math.round((correctWords / usedTime) * 60);
    setFinalWPM(wpm);
  };

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
    setIsStarted(false);
    setIsFinished(false);
    setTypedWords([]);
    setUserInput('');
    setCurrentWordIndex(0);
    setTimeLeft(0);
    setTotalTime(0);
    setFinalWPM(0);
    setScore(0);
    setIsGameOver(false);
    setTimerStarted(false);
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
          <span key={i} className="word current active-word">
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

      {isStarted && (
        <>
          <div className="timer-box">Time Left: {formatTime(timeLeft)}</div>
          <div className="score-box">Score: {score}</div>
        </>
      )}

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
            <p>WPM: {finalWPM}</p>
          </div>

          {isGameOver && (
            <div className="game-over">
              <h1>GAME OVER</h1>
              <p>Your score dropped below 0.</p>
            </div>
          )}

          <div className="prompt">{renderWords()}</div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleChange}
            disabled={isFinished || isGameOver}
            autoComplete="off"
          />

          {isFinished && (
            <div className="result">
              <h3>Final WPM: {finalWPM}</h3>
              <h3>Final Score: {score}</h3>
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