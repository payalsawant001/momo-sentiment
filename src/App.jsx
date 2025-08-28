import React, { useState } from "react";
import Sentiment from "sentiment";
import "./App.css";  // our styling

function App() {
  // state for current page
  const [page, setPage] = useState("intro");

  // state for user typed text
  const [text, setText] = useState("");

  // state for sentiment result
  const [result, setResult] = useState(null);

  // exercise index to track which exercise we are on
  const [exIndex, setExIndex] = useState(0);

  // feedback for exercise answers
  const [feedback, setFeedback] = useState("");

  // sentiment library
  const sentiment = new Sentiment();

  // list of exercises
  const exercises = [
    { sentence: "I got ice cream today, yay!", answer: "Happy😊" },
    { sentence: "Ugh I hate homework so much.", answer: "Angry😡" },
    { sentence: "My cat is so cute!", answer: "Happy😊" },
    { sentence: "I fell down and scraped my knee...", answer: "Sad😢" },
  ];

  // function to analyze typed text
  const analyzeText = () => {
    const res = sentiment.analyze(text);
    if (res.score > 0) {
      setResult("Happy😊");  // positive
    } else if (res.score < 0) {
      setResult("Angry😡");  // negative
    } else {
      setResult("😐 Meh");   // neutral
    }
  };

  // function to check exercise answer
  const checkAnswer = (ans) => {
    if (ans === exercises[exIndex].answer) {
      setFeedback("✅ Yay got it!");  // correct
    } else {
      setFeedback("❌ Nope, try again hehe"); // wrong
    }
  };

  // function to render page based on current state
  const renderPage = () => {
    // intro page
    if (page === "intro") {
      return (
        <div className="container intro">
          <h1>Hi! I'm Momo🤖</h1>
          <p>Can you help me learn human feelings? 😎</p>
          <button onClick={() => setPage("exercise")}>Letts Start!</button>
        </div>
      );
    }

    // exercise page
    if (page === "exercise") {
      const ex = exercises[exIndex];
      return (
        <div className="container exercise">
          <h2>Exercise {exIndex + 1}</h2>
          <p>{ex.sentence}</p>
          <div className="buttons">
            <button onClick={() => checkAnswer("Happy😊")}>Happy😊</button>
            <button onClick={() => checkAnswer("Sad😢")}>😢 Sad</button>
            <button onClick={() => checkAnswer("Angry😡")}>Angry😡</button>
          </div>
          <h3>{feedback}</h3>
          {exIndex < exercises.length - 1 ? (
            <button
              className="next"
              onClick={() => {
                setExIndex(exIndex + 1);
                setFeedback(""); // reset feedback
              }}
            >
              Next
            </button>
          ) : (
            <button onClick={() => setPage("demo")} className="next">
              Go Demo
            </button>
          )}
        </div>
      );
    }

    // demo page
    if (page === "demo") {
      return (
        <div className="container demo">
          <h1>Try typing a sentence 🤔</h1>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
          />
          <button onClick={analyzeText}>Check Mood</button>
          <h2>{result}</h2>
          <button onClick={() => setPage("finish")} className="next">
            Finish
          </button>
        </div>
      );
    }

    // finish page
    if (page === "finish") {
      return (
        <div className="container finish">
          <h1>🎉 Woohoo!</h1>
          <p>You helped Momo learn feelings! That’s Sentiment Analysis hehe 😎</p>
          <button
            onClick={() => {
              setPage("intro");
              setText("");
              setResult(null);
              setExIndex(0);
              setFeedback("");
            }}
          >
            Restart
          </button>
        </div>
      );
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
