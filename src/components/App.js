import React, { useState, useEffect } from "react";
import background from "../assets/background.png";
import { ReactComponent as Adventure } from "../assets/undraw_adventure_4hum 1.svg";
import Card from "./Card";

function App() {
  const [countries, setCountries] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isFlag, setIsFlag] = useState(false);
  const [flag, setFlag] = useState("");
  const [isAswered, setIsAswered] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [result, setResult] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getCountriesList = async () => {
    await fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  };

  const getRandomCountries = (answerIndex, countryCount) => {
    const newArray = [];
    newArray.push(countries[answerIndex].name);
    for (let i = 0; i < 3; i++) {
      let index = Math.round(Math.random() * countryCount);
      let randomCountryIndex =
        newArray.includes(countries[index].name) ||
        !countries[index].name ||
        !countries[index].capital
          ? index + 1
          : index;
      newArray.push(countries[randomCountryIndex].name);
    }
    // we randomize the distribution of the answers //
    newArray.sort(() => Math.random() - 0.5);
    setAnswers(newArray);
  };

  const getQuestion = () => {
    let randomQuestionType = Math.round(Math.random());
    let countryCount = countries.length;
    let randomCountry = Math.round(Math.random() * countryCount);

    setIsAswered(false);

    if (!gameOver) {
      if (selectedValue === correctAnswer) {
        if (countries) {
          if (randomQuestionType === 0) {
            // Capital Question //
            setQuestion(
              `${countries[randomCountry].capital} is the capital of`
            );
            setCorrectAnswer(countries[randomCountry].name);
            getRandomCountries(randomCountry, countryCount);
            setIsFlag(false);
          } else {
            // Capital Flag //
            setQuestion("Which country does this flag belong to?");
            setCorrectAnswer(countries[randomCountry].name);
            getRandomCountries(randomCountry, countryCount);
            setFlag(`${countries[randomCountry].flag}`);
            setIsFlag(true);
          }
        }
      } else {
        setGameOver(true);
      }
    }
  };

  const handleAnswer = (event, value) => {
    event.preventDefault();
    setIsAswered(true);
    setSelectedValue(value);
    if (value === correctAnswer) {
      setResult((prev) => prev + 1);
    }
  };

  const restart = () => {
    setGameOver(false);
    setResult(0);
    setSelectedValue("");
    setCorrectAnswer("");
  };

  // Get Country list only one time, at the initial loading of the page //
  useEffect(() => {
    getCountriesList();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      getQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, gameOver]);

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="App__container">
        <h1>Country quiz</h1>
        {!gameOver && <Adventure />}
        <Card
          answers={answers}
          question={question}
          flag={flag}
          isFlag={isFlag}
          handleAnswer={handleAnswer}
          correctAnswer={correctAnswer}
          selectedValue={selectedValue}
          isAswered={isAswered}
          getQuestion={getQuestion}
          gameOver={gameOver}
          result={result}
          restart={restart}
        />
      </div>
    </div>
  );
}

export default App;
