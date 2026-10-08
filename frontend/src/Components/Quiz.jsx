
import { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

import { useTranslation } from "../hooks/useTranslationContext";

export default function Quiz({ closeQuiz, questions, contentDirection }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const isLastQuestion = currentIndex === questions.length - 1;

  const isQuizFinished =
    currentIndex === questions.length - 1 && answerRevealed;

  const { t } = useTranslation();

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setChosenAnswer(null);
      setAnswerRevealed(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setChosenAnswer(null);
      setAnswerRevealed(false);
    }
  };

  const handleTryAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setChosenAnswer(null);
    setAnswerRevealed(false);
  };

  const handleAnswerClick = (key) => {
    if (answerRevealed) return;

    setChosenAnswer(key);
    setAnswerRevealed(true);

    if (key === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const getOptionClassName = (key) => {
    if (!answerRevealed) {
      return "border-gray-200 bg-white hover:border-primary hover:bg-primary/5 cursor-pointer";
    }

    const isCorrect = key === currentQuestion.correctAnswer;
    const isChosen = key === chosenAnswer;

    if (isChosen) {
      return isCorrect
        ? "border-green-500 bg-green-50 text-green-700"
        : "border-red-500 bg-red-50 text-red-700";
    } else if (isCorrect) {
      return "border-green-500 bg-green-50 text-green-700";
    }

    return "border-gray-200 bg-gray-50 text-gray-400";
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  // 1. Error / Empty State
  if (!questions || questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <IoMdClose
            className="absolute right-4 top-4 cursor-pointer text-2xl text-gray-400 transition hover:text-primary"
            onClick={closeQuiz}
          />

          <div className="pt-5 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Error: No Quiz Available
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              The questions could not be loaded or generated. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Quiz Finished State
  if (isQuizFinished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white px-6 py-10 text-center shadow-xl">
          <IoMdClose
            className="absolute right-4 top-4 cursor-pointer text-2xl text-gray-400 transition hover:text-primary"
            onClick={closeQuiz}
          />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-2xl font-bold text-primary">
            ✓
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            {t("quiz_completeed")}
          </h2>

          <p className="mt-3 text-lg font-semibold text-gray-600">
            {t("score")}{" "}
            <span className="text-primary">{score}</span>{" "}
            {t("out_of")} {questions.length}
          </p>

          <button
            className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary hover:text-gray-900 active:scale-95"
            onClick={handleTryAgain}
          >
            {t("try_again")}
          </button>
        </div>
      </div>
    );
  }

  // 3. Main Question View
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-secondary/30 bg-white shadow-xl">
        <IoMdClose
          className="absolute right-4 top-4 z-10 cursor-pointer text-2xl text-gray-400 transition hover:text-primary"
          onClick={closeQuiz}
        />

        <div
          className="px-6 pb-6 pt-10 sm:px-8"
          style={{ direction: contentDirection }}
        >
          <div className="mb-5">
            <span className="text-sm font-semibold text-primary">
              Question {currentIndex + 1} / {questions.length}
            </span>

            <h3 className="mt-3 text-lg font-bold leading-7 text-gray-800 sm:text-xl">
              {currentQuestion.question}
            </h3>

            <p className="mt-3 text-sm font-medium text-gray-500">
              Score:{" "}
              <span className="font-bold text-primary">{score}</span>
            </p>
          </div>

          <ul className="space-y-3">
            {Object.entries(currentQuestion.options).map(
              ([key, value]) => (
                <li
                  key={key}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-4 ${getOptionClassName(
                    key
                  )}`}
                  onClick={() => handleAnswerClick(key)}
                >
                  <span className="mr-2 font-bold">
                    {key.toUpperCase()}:
                  </span>

                  {value}
                </li>
              )
            )}
          </ul>
        </div>

        <div
          className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:px-8"
          style={{ direction: "ltr" }}
        >
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!answerRevealed || isLastQuestion}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastQuestion ? "View Score" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

