import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TutorialsCard = ({ tutorial }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [openQuiz, setOpenQuiz] = useState(false); // Show quiz modal
  const navigate = useNavigate();

  // Fetch quiz questions based on content_id
  const fetchQuizQuestions = (contentId) => {
    axios.get(`/api/questions?content_id=${contentId}`)  // Replace with your actual API endpoint
      .then(response => {
        setQuizQuestions(response.data); // Set quiz questions data
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
      });
  };

  // Open quiz and fetch questions
  const handleTakeQuiz = (contentId) => {
    setOpenQuiz(true);
    fetchQuizQuestions(contentId);
  };

  // Navigate to the quiz page if needed or open a modal for the quiz
  const handleStartQuiz = () => {
    navigate(`/quiz/${tutorial.content_id}`); // Navigate to the quiz page
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {tutorial.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tutorial.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleTakeQuiz(tutorial.content_id)}>
          Take Quiz
        </Button>
        <Button size="small" onClick={() => navigate(`/tutorials/${tutorial.content_id}`)}>
          View Content
        </Button>
      </CardActions>
    </Card>
  );
};

export default TutorialsCard;
