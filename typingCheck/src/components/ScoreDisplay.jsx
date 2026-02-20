

// import React from "react";

// function ScoreDisplay({ wpm, accuracy }) {
//   const getMessage = () => {
//     if (wpm < 20) return "Keep Practicing!";
//     if (wpm < 40) return "Good Job!";
//     return "Typing Master! 👑";
//   };

//   return (
//     <div className="score-display">
//       <h2>🏆 Your Score</h2>
//       <p>WPM: {wpm}</p>
//       <p>Accuracy: {accuracy}%</p>
//       <p>{getMessage()}</p>
//     </div>
//   );
// }

// export default ScoreDisplay;



import React from "react";

function ScoreDisplay({ wpm, accuracy }) {
  const getMessage = () => {
    if (accuracy < 60) return "Keep Practicing! ⚠️";
    if (wpm < 20) return "Slow & Steady! 🐢";
    if (wpm < 40) return "Good Job! 👍";
    return "Typing Master! 👑";
  };

  return (
    <div className="score-display" style={styles.container}>
      <h2 style={styles.heading}>🏆 Your Score</h2>
      <p style={styles.stat}>WPM: {wpm}</p>
      <p style={styles.stat}>Accuracy: {accuracy}%</p>
      <p style={styles.message}>{getMessage()}</p>
    </div>
  );
}

// Optional inline styles for dark theme & shadow
const styles = {
  container: {
    background: "#2b2b3a",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
    color: "#fff",
    marginTop: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    color: "#ffd166",
    textShadow: "1px 1px 4px #000",
    marginBottom: "10px",
  },
  stat: {
    fontSize: "1.2rem",
    margin: "5px 0",
  },
  message: {
    fontSize: "1.3rem",
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default ScoreDisplay;