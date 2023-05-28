import React from "react";

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

export default React.memo(Word);
