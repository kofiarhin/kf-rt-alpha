import React, { useState, useEffect } from "react";
import words from "./words";
import "./App.css";

function shuffle(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

const App = () => {
  const [current, setCurrent] = useState({ word: "", hint: "" });
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [maxShuffle, setMaxShuffle] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    if (score < 0) setGameOver(true);
  }, [score]);

  const getNewWord = (deductPoint = false) => {
    if (gameOver) return;
    if (deductPoint) setScore((prev) => prev - 1);

    const random = words[Math.floor(Math.random() * words.length)];
    setCurrent(random);
    setScrambled(shuffle(random.word));
    setGuess("");
    setMessage("");
    setShowAnswer(false);
    setFadeKey((prev) => prev + 1);
    setShuffleCount(0);
    setStreak(0); // reset streak on skip
  };

  const reshuffleWord = () => {
    if (shuffleCount >= maxShuffle) return;
    setScrambled(shuffle(current.word));
    setShuffleCount((prev) => prev + 1);
    setFadeKey((prev) => prev + 1);
  };

  const checkGuess = () => {
    const trimmedGuess = guess.trim().toLowerCase();
    const correctAnswer = current.word.toLowerCase();

    if (trimmedGuess === correctAnswer) {
      const newStreak = streak + 1;

      if (newStreak >= 3) {
        setMessage("🔥 Streak Bonus! +10 Points");
        setScore((prev) => prev + 10);
        setStreak(0);
      } else {
        setMessage("Correct!");
        setScore((prev) => prev + 3);
        setStreak(newStreak);
      }

      setMaxShuffle((prev) => prev + 1);

      setTimeout(() => {
        getNewWord();
      }, 800);
    } else {
      setMessage("Try again.");
      setScore((prev) => prev - 1);
      setStreak(0); // reset streak on wrong answer
    }
  };

  const revealAnswer = () => {
    if (gameOver) return;
    setShowAnswer(true);
    setScore((prev) => prev - 1);
    setStreak(0); // reset streak on reveal
    setTimeout(() => {
      getNewWord();
    }, 2000);
  };

  const restartGame = () => {
    setScore(0);
    setMaxShuffle(3);
    setShuffleCount(0);
    setGameOver(false);
    setStreak(0);
    getNewWord();
  };

  if (gameOver) {
    return (
      <div className="container">
        <h1 className="game-over">GAME OVER</h1>
        <button className="button" onClick={restartGame}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="score">
        Score: {score} <span> streak: {streak} </span>{" "}
      </h3>
      <h1 className="title">Guess The Word</h1>
      <div key={fadeKey} className="fadeIn">
        <h1 className="scrambled">{scrambled}</h1>
        <p className="hint">
          <strong>Hint:</strong> {current.hint}
        </p>
      </div>

      {message && <p className="message">{message}</p>}
      {showAnswer && (
        <h2 className="answer">
          <strong>Answer:</strong> {current.word}
        </h2>
      )}

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Type your guess"
        className="input"
      />

      <div className="buttonRow">
        <button onClick={checkGuess} className="button">
          Submit
        </button>

        {maxShuffle - shuffleCount > 0 && (
          <button onClick={reshuffleWord} className="button">
            Shuffle Again ({maxShuffle - shuffleCount} left)
          </button>
        )}

        <button onClick={revealAnswer} className="button">
          Reveal
        </button>

        <button onClick={() => getNewWord(true)} className="button">
          Next (-1 point)
        </button>
      </div>
    </div>
  );
};

export default App;
