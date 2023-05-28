import { useEffect } from "react";

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

export default Timer;