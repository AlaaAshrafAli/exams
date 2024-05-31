// App.jsx

import React, { useState } from 'react';
import './App.css';
import Exam from './exam.jsx';

function App() {
  const [questions, setQuestions] = useState([{ question: "", choices: [""] }]);

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (event, questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({ question: "", choices: [""] });
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const addChoice = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.push("");
    setQuestions(newQuestions);
  };

  const removeChoice = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setQuestions(newQuestions);
  };

  const handleCorrectChoice = (questionIndex, choiceIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctChoice = choiceIndex;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    if (questions.every(question => question.question.trim() !== "" && question.choices.every(choice => choice.trim() !== ""))) {
      console.log("Submitted questions:", questions);
    } else {
      alert("Please fill in all questions and choices before submitting.");
    }
  };

  return (
    <div className="App">
      <h1>MCQ Exam</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Enter question ${index + 1}`}
            value={question.question}
            onChange={(event) => handleQuestionChange(event, index)}
          />
          <div>
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <input
                  type="text"
                  placeholder={`Enter choice ${choiceIndex + 1}`}
                  value={choice}
                  onChange={(event) => handleChoiceChange(event, index, choiceIndex)}
                />
                {choiceIndex === questions[index].correctChoice && <span> - Correct Answer</span>}
                {choiceIndex !== 0 && <button onClick={() => removeChoice(index, choiceIndex)}>Remove Choice</button>}
                {choiceIndex === question.choices.length - 1 && <button onClick={() => addChoice(index)}>Add Choice</button>}
              </div>
            ))}
          </div>
          {index !== 0 && <button onClick={() => removeQuestion(index)}>Remove Question</button>}
          <div>
            <button onClick={() => handleCorrectChoice(index, question.choices.length - 1)}>Set Correct Answer</button>
          </div>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
