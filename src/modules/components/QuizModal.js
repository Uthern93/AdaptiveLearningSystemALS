import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  Button, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box,
  Typography,
  LinearProgress,
  Fade
} from '@mui/material';
import { toast } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const QuizModal = ({ questions, tutorial, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  useEffect(() => {
    // Reset state when moving to next question
    setSelectedAnswer('');
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleAnswerChange = (answer) => {
    if (isAnswered) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.warning('Please select an answer');
      return;
    }

    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success('Correct answer!');
      
      // Wait for 1.5 seconds before moving to next question
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setShowResult(true);
        }
      }, 1500);
    } else {
      toast.error('Incorrect answer. Try again!');
    }
  };

  const ResultScreen = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        textAlign: 'center'
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Quiz Completed!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Score: {score} out of {questions.length}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {score === questions.length 
          ? "Perfect score! Excellent work!" 
          : "Keep practicing to improve your score!"}
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Close Quiz
      </Button>
    </Box>
  );

  const QuestionScreen = () => (
    <>
      <Box sx={{ width: '100%', mb: 3 }}>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {currentQuestion.question_text}
      </Typography>

      <RadioGroup
        value={selectedAnswer}
        onChange={(e) => handleAnswerChange(e.target.value)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {JSON.parse(currentQuestion.options).map((option, index) => (
            <Fade in={true} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
              <Box
                sx={{
                  border: 1,
                  borderColor: isAnswered
                    ? option === currentQuestion.correct_answer
                      ? 'success.main'
                      : selectedAnswer === option
                      ? 'error.main'
                      : 'divider'
                    : 'divider',
                  borderRadius: 2,
                  p: 2,
                  transition: 'all 0.3s ease',
                  bgcolor: isAnswered
                    ? option === currentQuestion.correct_answer
                      ? 'success.light'
                      : selectedAnswer === option
                      ? 'error.light'
                      : 'background.paper'
                    : 'background.paper',
                  '&:hover': {
                    bgcolor: isAnswered ? undefined : 'action.hover',
                  }
                }}
              >
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isAnswered}
                  sx={{ width: '100%', m: 0 }}
                />
                {isAnswered && option === currentQuestion.correct_answer && (
                  <CheckCircleOutlineIcon sx={{ color: 'success.main', ml: 1 }} />
                )}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.correct_answer && (
                  <ErrorOutlineIcon sx={{ color: 'error.main', ml: 1 }} />
                )}
              </Box>
            </Fade>
          ))}
        </Box>
      </RadioGroup>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose} color="inherit">
          Exit Quiz
        </Button>
        <Button
          onClick={handleAnswerSubmit}
          variant="contained"
          disabled={!selectedAnswer || isAnswered}
        >
          Submit Answer
        </Button>
      </Box>
    </>
  );

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '60vh'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {tutorial.title} Quiz
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {showResult ? <ResultScreen /> : <QuestionScreen />}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;