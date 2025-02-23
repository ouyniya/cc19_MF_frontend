import React, { useState } from "react";
import { Link } from "react-router";

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
];

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // object {1: Ans1, 2: Ans2}
  const [allScore, setAllScore] = useState(0);

  const handleSelect = (option, score) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: option });
    setAllScore((prev) => prev + score);
  };

  const nextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <h1 className="text-2xl text-center">{allScore}</h1>
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-575px)] text-gray-800">
        <div className="flex">
          <ul className="steps">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step, index) => (
              <li
                key={index}
                className={`step ${
                  step - 1 <= currentIndex ? "step-primary" : ""
                }`}
              ></li>
            ))}
          </ul>
        </div>
        <div className="bg-white px-[54px] py-[48px] rounded-xl shadow-lg w-full max-w-xl min-w-[350px] text-center">
          <h2 className="text-xl font-semibold mb-4">
            {quizQuestions[currentIndex].question}
          </h2>
          <div className="space-y-2">
            {quizQuestions[currentIndex].options.map((option, idx) => (
              <button
                key={idx}
                className={`w-full py-2 rounded-lg border transition-colors ${
                  selectedAnswers[currentIndex] === option
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                }`}
                onClick={() => handleSelect(option, idx + 1)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              Prev
            </button>

            {currentIndex < quizQuestions.length - 1 && (
              <button
                className="px-4 py-2 bg-primary text-white rounded-full"
                onClick={nextQuestion}
                // disabled={currentIndex === quizQuestions.length - 1}
              >
                Next
              </button>
            )}

            {currentIndex === quizQuestions.length - 1 && (
              <Link to='/risk-assessment-result'>
                <button className="px-4 py-2 bg-secondary text-white rounded-full">
                  ส่งคำตอบ
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
