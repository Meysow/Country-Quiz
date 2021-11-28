import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

const Answers = ({
  answers,
  handleAnswer,
  correctAnswer,
  selectedValue,
  isAswered,
}) => {
  // Display the A, B, C, D before the answers : //
  // function that return a Letter from a number input //
  const orderedAnswers = (index) => String.fromCharCode(97 + index);

  // Add a class depending if the answer is correct or not //
  const isCorrect = (item) => isAswered && item === correctAnswer && "correct";

  const isIncorrect = (item) =>
    isAswered &&
    item === selectedValue &&
    item !== correctAnswer &&
    "incorrect";

  // Add a class to make the answers in-targetable when the user set a response //
  let untargetable = isAswered && "untargetable";

  return (
    <ol className="answers">
      {answers.map((item, i) => {
        return (
          <li
            className={`answer ${isCorrect(item)} ${isIncorrect(
              item
            )} ${untargetable}`}
            key={item}
            onClick={(e) => handleAnswer(e, item)}
          >
            <span className="letter">{orderedAnswers(i)}</span>
            <input type="radio" name={item} value={item} id={item} />
            <label htmlFor={item}>{item}</label>
            {isCorrect(item) && (
              <span className="validate__icon">
                <FaRegCheckCircle />
              </span>
            )}
            {isIncorrect(item) && (
              <span className="validate__icon">
                <FaRegTimesCircle />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Answers;
