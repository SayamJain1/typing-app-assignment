import { useEffect, useRef, useState } from "react";
import "./App.css";

const getKeys = () =>
  `as df jk l; ds kj ;a lf ja ld ;a lk fa lf as df jk ;l ds kj kd ls ;a jf aj sk dl f;`
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

const Word = ({ text, active, correct }) => {
  // TODO/: 1. optimize it using memo

  if (correct === true) {
    return <span className="correct"> {text} </span>;
  }
  if (correct === false) {
    return <span className="inCorrect"> {text} </span>;
  }
  if (active) {
    return <span className="active"> {text} </span>;
  }
  return <span>{text} </span>;
};

const Timer = ({ startCount, correctWords, time, setTime }) => {
  useEffect(() => {
    let interval;
    if (startCount) {
      interval = setInterval(() => {
        setTime((old) => old + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [startCount, setTime]);
  const minutes = time / 60;
  return (
    <div className="scores">
      <p>Time: {time}</p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</p>
    </div>
  );
};

function App() {
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(0);
  const keys = useRef(getKeys());

  const [activeWordI, setActiveWordI] = useState(0);
  const [correctWordArr, setCorrectWordArr] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  const processInput = (value) => {
    setStartCounting(true);

    if (activeWordI === keys.current.length) {
      return;
    }

    if (value.endsWith(" ")) {
      if (activeWordI === keys.current.length - 1) {
        // end
        setStartCounting(false);
        setTimeOut(true);
      }

      setActiveWordI((i) => i + 1);
      setUserInput("");

      // correct word
      setCorrectWordArr((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordI] = word === keys.current[activeWordI];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  };

  const handleRestart = () => {
    setUserInput("");
    setActiveWordI(0);
    setCorrectWordArr([]);
    setStartCounting(false);
    setTimeOut(false);
    setTime(0);
    getKeys();
  };
  return (
    <>
      <h2>Touch Typing Test</h2>
      <Timer
        time={time}
        setTime={setTime}
        startCount={startCounting}
        correctWords={correctWordArr.filter(Boolean).length}
      />
      <div className="accuracy">
        <p>
          Accuracy:{" "}
          {(
            (correctWordArr.filter((value) => value === true).length /
              correctWordArr.length) *
              100 || 0
          ).toFixed(2)}
        </p>
        <button className="restart" onClick={handleRestart}>
          Restart Test
        </button>
      </div>
      <div className="word-container">
        <p>
          {keys.current.map((item, i) => {
            return (
              <Word
                key={i}
                text={item}
                active={i === activeWordI}
                correct={correctWordArr[i]}
              />
            );
          })}
        </p>
      </div>
      <h2>{timeOut ? "Time out!!!" : ""}</h2>
      <input
        type="text"
        placeholder="Type here..."
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
        className="input"
      />
    </>
  );
}

export default App;
