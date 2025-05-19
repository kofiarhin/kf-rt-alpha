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
  const [typedWords, setTypedWords] = useState([]); // <-- stores each typed word + correctness
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

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
      const isCorrect = typedWord === expectedWord;

      setTypedWords([...typedWords, { typed: typedWord, correct: isCorrect }]);
      setUserInput('');
      setCurrentWordIndex(prev => prev + 1);

      if (currentWordIndex + 1 === wordList.length) {
        setEndTime(Date.now());
        setIsFinished(true);
      }
    } else {
      setUserInput(value);
    }
  };

  const getWPM = () => {
    const correctWords = typedWords.filter(w => w.correct).length;
    const minutes = (endTime - startTime) / 60000;
    return Math.round(correctWords / minutes);
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
    inputRef.current.focus();
  };

  const renderWordWithFeedback = (typed, expected) => {
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