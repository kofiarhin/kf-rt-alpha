import React, { useState, useEffect, useRef } from "react";
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

const difficultySettings = {
  easy: 15,
  medium: 10,
  hard: 5,
};

const App = () => {
  const [current, setCurrent] = useState({ word: "", hints: [] });
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
  const [hintIndex, setHintIndex] = useState(0);
  const [statusClass, setStatusClass] = useState("");
  const [showUnscrambledBeforeGameOver, setShowUnscrambledBeforeGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState(null); // null until picked
  const [gameStarted, setGameStarted] = useState(false);

  const timerRef = useRef(null);

  // Only start game when difficulty picked
  useEffect(() => {
    if (gameStarted) {
      getNewWord();
    }
  }, [gameStarted]);

  useEffect(() => {
    if (score < 0 && !gameOver) {
      setShowUnscrambledBeforeGameOver(true);
      setTimeout(() => {
        setShowUnscrambledBeforeGameOver(false);
        setGameOver(true);
      }, 3000);
    }
  }, [score, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver || showAnswer) {
      clearInterval(timerRef.current);
      return;
    }

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [current, showAnswer, gameOver, gameStarted]);

  const handleTimeout = () => {
    setMessage("Time's up! Revealing answer...");
    setShowAnswer(true);
    setScore((prev) => prev - 1);
    setStreak(0);
    setStatusClass("wrong");

    setTimeout(() => {
      setStatusClass("");
      setShowAnswer(false);
      getNewWord();
    }, 3000);
  };

  const getNewWord = (deductPoint = false) => {
    if (gameOver || !gameStarted) return;
    if (deductPoint) setScore((prev) => prev - 1);

    const random = words[Math.floor(Math.random() * words.length)];
    setCurrent(random);
    setScrambled(shuffle(random.word));
    setGuess("");
    setMessage("");
    setShowAnswer(false);
    setFadeKey((prev) => prev + 1);
    setShuffleCount(0);
    setHintIndex(0);
    setStatusClass("");
    setTimer(difficultySettings[difficulty]);
  };

  const reshuffleWord = () => {
    if (shuffleCount >= maxShuffle || gameOver || showAnswer) return;
    setScrambled(shuffle(current.word));
    setShuffleCount((prev) => prev + 1);
    setFadeKey((prev) => prev + 1);
  };

  const checkGuess = () => {
    if (gameOver || showAnswer || !gameStarted) return;

    const trimmedGuess = guess.trim().toLowerCase();
    const correctAnswer = current.word.toLowerCase();

    if (trimmedGuess === correctAnswer) {
      const newStreak = streak + 1;

      if (newStreak % 3 === 0) {
        setMessage("🔥 Streak Bonus! +10 Points");
        setScore((prev) => prev + 10);
      } else {
        setMessage("Correct!");
        setScore((prev) => prev + 3);
      }

      setStreak(newStreak);
      setMaxShuffle((prev) => prev + 1);
      setStatusClass("correct");

      clearInterval(timerRef.current);

      setTimeout(() => {
        setStatusClass("");
        getNewWord();
      }, 800);
    } else {
      setMessage("Try again.");
      setScore((prev) => prev - 1);
      setStreak(0);
      setStatusClass("wrong");

      setTimeout(() => setStatusClass(""), 800);
    }
  };

  const revealAnswer = () => {
    if (gameOver || showAnswer || !gameStarted) return;
    clearInterval(timerRef.current);
    setShowAnswer(true);
    setScore((prev) => prev - 1);
    setStreak(0);
    setTimeout(() => {
      getNewWord();
    }, 2000);
  };

  const nextHint = () => {
    if (gameOver || showAnswer || !gameStarted) return;
    if (hintIndex < current.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
      setScore((prev) => prev - 1);
      setMessage("");
    }
  };

  const restartGame = () => {
    setScore(0);
    setMaxShuffle(3);
    setShuffleCount(0);
    setGameOver(false);
    setStreak(0);
    setStatusClass("");
    setTimer(0);
    setGameStarted(false);
    setDifficulty(null);
    setCurrent({ word: "", hints: [] });
    setScrambled("");
    setGuess("");
    setMessage("");
    setShowAnswer(false);
    setFadeKey(0);
    setHintIndex(0);
  };

  if (!gameStarted) {
    // Show difficulty selection before game start
    return (
      <div className="container">
        <h1>Choose Difficulty to Start</h1>
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            className="button"
            onClick={() => {
              setDifficulty(level);
              setGameStarted(true);
            }}
            style={{ marginRight: 12, minWidth: 100 }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    );
  }

  if (showUnscrambledBeforeGameOver) {
    return (
      <div className="container">
        <h1 className="scrambled wrong">{current.word}</h1>
        <p className="message">Game over incoming...</p>
      </div>
    );
  }

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
        Score: {score} <span> streak: {streak} </span>
      </h3>
      <h3>Time Left: {timer}s</h3>
      <h1 className="title">Guess The Word</h1>
      <div key={fadeKey} className={`fadeIn ${statusClass}`}>
        <h1 className="scrambled">{scrambled}</h1>
        <p className="hint">
          <strong>Hint:</strong> {current.hints[hintIndex]}
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
        disabled={showAnswer}
      />

      <div className="buttonRow">
        <button onClick={checkGuess} className="button" disabled={showAnswer}>
          Submit
        </button>

        {maxShuffle - shuffleCount > 0 && !showAnswer && (
          <button onClick={reshuffleWord} className="button">
            Shuffle Again ({maxShuffle - shuffleCount} left)
          </button>
        )}

        <button onClick={nextHint} className="button" disabled={showAnswer}>
          Hint (-1 point)
        </button>

        <button onClick={revealAnswer} className="button" disabled={showAnswer}>
          Reveal
        </button>

        <button onClick={() => getNewWord(true)} className="button" disabled={showAnswer}>
          Next (-1 point)
        </button>
      </div>
    </div>
  );
};

export default App;