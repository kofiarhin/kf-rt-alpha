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

  const handleKeyDown = (e) => {
    if (isFinished) return;

    if (!startTime) setStartTime(Date.now());

    if (e.key === ' ') {
      e.preventDefault();

      if (userInput.trim() === wordList[currentWordIndex]) {
        setJumpIndex(currentWordIndex);
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');

        if (currentWordIndex + 1 === wordList.length) {
          setEndTime(Date.now());
          setIsFinished(true);
        }

        setTimeout(() => setJumpIndex(null), 300);
      }
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      // Allow character input & backspace
      return;
    } else {
      e.preventDefault(); // Block non-character junk
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
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
      let className = 'word';
      if (i < currentWordIndex) className += ' correct';
      else if (i === currentWordIndex) className += ' current';
      if (i === jumpIndex) className += ' jump';

      return (
        <span key={i} className={className}>
          {