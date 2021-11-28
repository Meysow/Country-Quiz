import React from "react";
import Question from "./Question";
import Answers from "./Answers";
import Results from "./Results";

const Card = ({
  answers,
  question,
  flag,
  isFlag,
  handleAnswer,
  correctAnswer,
  selectedValue,
  isAswered,
  getQuestion,
  gameOver,
  result,
  restart,
}) => {
  const core = gameOver ? (
    <Results result={result} restart={restart} />
  ) : (
    <>
      <Question question={question} flag={flag} isFlag={isFlag} />
      <Answers
        answers={answers}
        handleAnswer={handleAnswer}
        correctAnswer={correctAnswer}
        selectedValue={selectedValue}
        isAswered={isAswered}
      />
    </>
  );

  const buttonNext = isAswered && (
    <div className="btn__container">
      <button className="btn__next" onClick={getQuestion}>
        Next
      </button>
    </div>
  );

  return (
    <div className="card">
      {core}
      {buttonNext}
    </div>
  );
};

export default Card;
