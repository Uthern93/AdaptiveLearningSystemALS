import React, { useState, useEffect } from 'react';
import { Button, Radio, FormControlLabel, RadioGroup, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { contentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // Fetch quiz questions based on contentId
  useEffect(() => {
    axios.get(`/api/questions?content_id=${contentId}`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
      });
  }, [contentId]);

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[questionId] = answer;
      return updatedAnswers;
    });
  };

  // Handle quiz submission and calculate score
  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        score += 1;
      }
    });
    setScore(score);
    alert(`Your score: ${score}/${questions.length}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Take the Quiz</Typography>
      <form>
        {questions.map((question, index) => (
          <Box key={question.question_id} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{question.content_id}</Typography>
            <RadioGroup
              value={selectedAnswers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            >
              {JSON.parse(question.options).map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Button variant="contained" onClick={handleSubmitQuiz}>
          Submit Quiz
        </Button>
      </form>
      {score !== 0 && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          You scored {score}/{questions.length}
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;
