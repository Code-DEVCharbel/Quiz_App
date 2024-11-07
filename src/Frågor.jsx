import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import he from "he";
import "./Frågor.css";

const Frågor = forwardRef(({ category }, ref) => {
  const [isToggled, setIsToggled] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isToggled) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=4&category=${category}`
          );
          const data = await response.json();
          const questionsWithSortedAnswers = data.results.map((question) => ({
            ...question,
            question: he.decode(question.question),
            all_answers: [
              ...question.incorrect_answers,
              question.correct_answer,
            ]
              .sort(() => Math.random() - 0.5)
              .map((answer) => he.decode(answer)),
          }));
          setQuestions(questionsWithSortedAnswers);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchQuestions();
    }
  }, [isToggled, category]);

  useImperativeHandle(ref, () => ({
    toggle() {
      setIsToggled(!isToggled);
      setSubmitted(false);
    },
  }));

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {isToggled && (
        <>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              <form onSubmit={handleSubmit}>
                {question.all_answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    style={{
                      color: submitted
                        ? answer === question.correct_answer
                          ? "green"
                          : selectedAnswers[index] === answer
                          ? "red"
                          : "black"
                        : "black",
                    }}
                  >
                    <label key={answerIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer}
                        onChange={() => handleAnswerChange(index, answer)}
                        checked={selectedAnswers[index] === answer}
                        disabled={submitted}
                      />
                      {answer}
                    </label>
                  </div>
                ))}
              </form>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Answers</button>
        </>
      )}
    </div>
  );
});

Frågor.propTypes = {
  category: PropTypes.number.isRequired, // Validate category prop as a number and required
};

Frågor.displayName = "Frågor"; // Adding display name to the component

export default Frågor;
