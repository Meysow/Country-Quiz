import React from "react";
import { ReactComponent as GameOver } from "../assets/undraw_winners_ao2o 2.svg";

const Results = ({ result, restart }) => {
  return (
    <div className="results">
      <GameOver />
      <h2>Results</h2>
      <p>
        you got <span className="good__answer">{result}</span> correct answers
      </p>
      <div>
        <button onClick={() => restart()}>Try again</button>
      </div>
    </div>
  );
};

export default Results;
