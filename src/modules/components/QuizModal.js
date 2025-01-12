import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { toast } from 'react-toastify';

const QuizModal = ({ questions, tutorial, onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    let correctAnswersCount = 0;

    questions.forEach((question) => {
      if (answers[question.question_id] === question.correct_answer) {
        correctAnswersCount++;
      }
    });

    toast.success(`You got ${correctAnswersCount} out of ${questions.length} correct!`);
    setSubmitted(true);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{tutorial.title} Quiz</DialogTitle>
      <DialogContent>
        {questions.map((question) => (
          <div key={question.question_id}>
            <h3>{question.content_id}</h3>
            <RadioGroup
              onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
              value={answers[question.question_id] || ''}
            >
              {JSON.parse(question.options).map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmitQuiz} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizModal;
