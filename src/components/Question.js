import React from "react";

const Question = ({ question, flag, isFlag }) => {
  return isFlag ? (
    <>
      <img src={flag} alt={flag} />
      <div className="question">{question}</div>
    </>
  ) : (
    <div className="question">{question}</div>
  );
};

export default Question;
