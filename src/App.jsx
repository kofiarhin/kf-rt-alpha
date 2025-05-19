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
    const words = targetText.split(' ');
    setWordList(words);
    inputRef.current.focus();
  }, [targetText]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (!startTime) setStartTime(Date.now());

    // If user hits space after a correct word
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
        // Block progression if incorrect
        // Optional: visual error feedback here
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
    setWordList(newText