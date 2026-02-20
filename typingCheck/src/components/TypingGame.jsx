


import React, { useState, useEffect, useRef } from "react";
import ScoreDisplay from "./ScoreDisplay";
import snippets from "./snippets";

function TypingGame() {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const inputRef = useRef();
  const [usedIndices, setUsedIndices] = useState([]);
  const prevCorrectPerLine = useRef([]);

  // Pick snippet on mount
  useEffect(() => pickNewSnippet(), []);

  // Timer
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      calculateScore();
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const startGame = () => {
    pickNewSnippet();
    setInput("");
    setTimeLeft(60);
    setIsRunning(true);
    setCurrentLineIndex(0);
    setWpm(0);
    setAccuracy(0);
    setTotalTypedChars(0);
    setTotalCorrectChars(0);
    setTotalWordsTyped(0);
    prevCorrectPerLine.current = [];
    inputRef.current.focus();
  };

  const pickNewSnippet = () => {
    let availableIndices = snippets.map((_, i) => i).filter(i => !usedIndices.includes(i));
    if (availableIndices.length === 0) {
      setUsedIndices([]);
      availableIndices = snippets.map((_, i) => i);
    }
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedIndices(prev => [...prev, randomIndex]);
    const snippet = snippets[randomIndex];
    const splitLines = snippet.split(". ").map(line => line.trim() + ".");
    setLines(splitLines);
    prevCorrectPerLine.current = [];
  };
const handleInputChange = (e) => {
  const value = e.target.value;
  setInput(value);
  const currentLine = lines[currentLineIndex] || "";

  // Total typed chars = sum of all input lengths so far
  const prevInputLength = prevCorrectPerLine.current[`inputLen_${currentLineIndex}`] || 0;
  const deltaChars = Math.max(value.length - prevInputLength, 0); // only count new chars
  setTotalTypedChars(prev => prev + deltaChars);
  prevCorrectPerLine.current[`inputLen_${currentLineIndex}`] = value.length;

  // Count correct chars for this line
  let correctChars = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === currentLine[i]) correctChars++;
  }

  const prevCorrect = prevCorrectPerLine.current[`correct_${currentLineIndex}`] || 0;
  setTotalCorrectChars(prev => prev + (correctChars - prevCorrect));
  prevCorrectPerLine.current[`correct_${currentLineIndex}`] = correctChars;

  // Update totalWordsTyped dynamically
  const wordsTypedNow = value.trim().split(/\s+/).filter(Boolean).length;
  const prevWords = prevCorrectPerLine.current[`words_${currentLineIndex}`] || 0;
  setTotalWordsTyped(prev => prev + (wordsTypedNow - prevWords));
  prevCorrectPerLine.current[`words_${currentLineIndex}`] = wordsTypedNow;

  // Move to next line if finished
  if (value.length >= currentLine.length) {
    if (currentLineIndex + 1 < lines.length) {
      setCurrentLineIndex(prev => prev + 1);
      setInput("");
    } else {
      pickNewSnippet();
      setCurrentLineIndex(0);
      setInput("");
    }
  }
};

  const calculateScore = () => {
    const elapsedTime = 60 - timeLeft;
    setWpm(elapsedTime > 0 ? Math.round((totalWordsTyped / elapsedTime) * 60) : 0);
    setAccuracy(totalTypedChars > 0 ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 0);
  };

  return (
    <div style={styles.app}>
      <div style={styles.gameContainer}>
        <h1 style={styles.title}>⏱ Typing Speed Challenge</h1>
        <div style={styles.snippetBox}>
          {isRunning && currentLineIndex < lines.length && <p>{lines[currentLineIndex]}</p>}
          {!isRunning && timeLeft === 60 && <p style={styles.info}>Click Start to begin typing!</p>}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={!isRunning}
          placeholder="Start typing here..."
          style={styles.textarea}
        />
        <div style={styles.controls}>
          <button onClick={startGame} style={styles.button}>
            {isRunning ? "Restart" : "Start"}
          </button>
          <p style={{ color: "#fff" }}>Time Left: {timeLeft}s</p>
        </div>
        {!isRunning && timeLeft !== 60 && <ScoreDisplay wpm={wpm} accuracy={accuracy} />}
      </div>
    </div>
  );
}

const styles = {
  app: {
    backgroundColor: "#1f1f2e",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    boxSizing: "border-box",
  },
  gameContainer: {
    backgroundColor: "#2b2b3a",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.7)",
    width: "100%",
    maxWidth: "700px",
    textAlign: "center",
  },
  title: {
    color: "#ffd166",
    marginBottom: "15px",
    fontSize: "2rem",
    textShadow: "1px 1px 5px #000",
  },
  snippetBox: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "15px",
    borderRadius: "10px",
    minHeight: "70px",
    marginBottom: "15px",
    fontSize: "1.1rem",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    wordBreak: "break-word",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    resize: "none",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ffd166",
    color: "#1f1f2e",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  info: {
    color: "#a5a5a5",
  },
};

export default TypingGame;