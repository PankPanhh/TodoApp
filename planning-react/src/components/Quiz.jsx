import { useEffect, useState } from "react";
import Result from "./Result";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
];

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length })
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (option, index) => {
    setOptionSelected(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  };

  const goNextQuestion = () => {
    if (currentQuestion === quizData.length - 1) {
      // Tính tổng điểm khi finish
      let total = 0;
      userAnswers.forEach((answerIndex, i) => {
        if (quizData[i].options[answerIndex] === quizData[i].answer) {
          total++;
        }
      });
      setScore(total);
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizFinished(false);
    setOptionSelected("");
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  };

  const rewatchQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  };

  // Khi chuyển câu hỏi → khôi phục lựa chọn nếu có
  useEffect(() => {
    const savedAnswerIndex = userAnswers[currentQuestion];
    if (savedAnswerIndex !== undefined) {
      setOptionSelected(quizData[currentQuestion].options[savedAnswerIndex]);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);

  if (isQuizFinished) {
    return (
      <Result
        score={score}
        totalQuestions={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{quizData[currentQuestion].question}</p>
      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          onClick={() => handleSelectOption(option, index)}
        >
          {option}
        </button>
      ))}

      {optionSelected ? (
        optionSelected === quizData[currentQuestion].answer ? (
          <p className="correct">✅ Correct!</p>
        ) : (
          <p className="incorrect">
            ❌ Incorrect! The correct answer is{" "}
            <strong>{quizData[currentQuestion].answer}</strong>.
          </p>
        )
      ) : null}

      <div className="nav-buttons">
        <button onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goNextQuestion} disabled={!optionSelected}>
          {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
