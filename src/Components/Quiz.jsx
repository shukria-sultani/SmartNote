import { useState } from "react";
import { IoMdClose } from "react-icons/io";


export default function Quiz({closeQuiz, questions}) {

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chosenAnswer, setChosenAnswer] = useState(null);
    const [answerRevealed, setAnswerRevealed] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentIndex];

    const isLastQuestion = currentIndex === questions.length - 1;
    const isQuizFinished = isLastQuestion && answerRevealed; 


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

    // Resets the entire quiz state to start from the beginning
    const handleTryAgain = () => {
        setCurrentIndex(0);
        setScore(0);
        setChosenAnswer(null);
        setAnswerRevealed(false);
    };

    // Scoring and answer revealing 
    const handleAnswerClick = (key) => {
        if (answerRevealed) return; 

        setChosenAnswer(key);
        setAnswerRevealed(true);
        
        if (key === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
    };
    
    // Function to determine the class for each <li>
    const getOptionClassName = (key) => {
        if (!answerRevealed) {
            return '';
        }
        
        const isCorrect = key === currentQuestion.correctAnswer;
        const isChosen = key === chosenAnswer;

        if (isChosen) {
            return isCorrect ? 'correct' : 'incorrect';
        } else if (isCorrect) {
            return 'correct'; 
        }
        return '';
    };
     if (!questions || questions.length === 0) {
        return (
            <div className="quiz-container">
                <div className="quiz-result-container p-8 text-center">
                    <CloseIcon className="closeIcon" onClick={closeQuiz} />
                    <h2>Error: No Quiz Available</h2>
                    <p>The questions could not be loaded. Please try again.</p>
                </div>
            </div>
        );
    }
    if (isQuizFinished) {
        return (
            <div className="quiz-container">
                <div className="quiz-result-container">
                    <div className="quiz-result">
                                          <IoMdClose className="closeIcon" onClick={closeQuiz} />

                        <h2>Quiz Complete!</h2>
                        <p className="score-text">
                            You scored {score} out of {questions.length}
                        </p>
                        <button className="try-again-button" onClick={handleTryAgain}>Try Again</button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="quiz-container">
            <div className="question">
                <IoMdClose className="closeIcon" onClick={closeQuiz} />
                <h3>{currentQuestion.question} ({currentIndex + 1}/{questions.length})</h3>
                <p className="current-score">Current Score: {score}</p>
                <ul>
                    {Object.entries(currentQuestion.options).map(([key, value]) => (
                        <li 
                            key={key} 
                            className={getOptionClassName(key)} 
                            onClick={() => handleAnswerClick(key)} 
                        >
                            <span>{`${key.toUpperCase()}: `}</span>
                            {value}
                        </li>
                    ))}
                </ul>

                <button 
                    onClick={handlePrev} 
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                <button 
                    onClick={handleNext} 
                    disabled={!answerRevealed || isLastQuestion}
                >
                    {isLastQuestion ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
}
