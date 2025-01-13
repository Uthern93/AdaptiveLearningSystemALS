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
  Fade,
  CircularProgress,  // Add this
  DialogActions      // Add this
} from '@mui/material';
import { toast } from 'react-toastify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const QuizModal = ({ questions, tutorial, onClose, onDifficultyChange, currentDifficulty: initialDifficulty }) => {
  // Add console.log to debug
  console.log('Questions received in modal:', questions);

  // Initialize state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChangedDifficulty, setHasChangedDifficulty] = useState(false);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress = questions.length ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  useEffect(() => {
    // Reset state when moving to next question
    setSelectedAnswer('');
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    setCurrentDifficulty(initialDifficulty);
}, [initialDifficulty]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setIsLoading(false);
    }
  }, [questions]);

  // Modify the check for questions
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>No Questions Available</DialogTitle>
            <DialogContent>
                <Typography>
                    There are no questions available for this tutorial at the moment.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

const handleQuizCompletion = async () => {
  const passThreshold = 0.7; // 70% correct to pass
  const passScore = questions.length * passThreshold;
  const finalScore = (score / questions.length) * 100;
  
  // If difficulty has already been changed once, show results
  if (hasChangedDifficulty) {
      setShowResult(true);
      return;
  }

  // First attempt at current difficulty
  if (score >= passScore) {
      if (currentDifficulty === 'medium') {
          toast.success('Great job! Moving to hard difficulty!');
          setHasChangedDifficulty(true);
          await onDifficultyChange('hard');
          setCurrentQuestionIndex(0);
          setScore(0);
          setWrongAnswers([]);
      } else {
          // If passed on easy or hard, show results
          setShowResult(true);
      }
  } else {
      if (currentDifficulty === 'medium') {
          toast.info('Let\'s try easy difficulty!');
          setHasChangedDifficulty(true);
          await onDifficultyChange('easy');
          setCurrentQuestionIndex(0);
          setScore(0);
          setWrongAnswers([]);
      } else {
          // If failed on easy or hard, show results
          setShowResult(true);
      }
  }
};

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
    } else {
        toast.error('Incorrect answer!');
        setWrongAnswers(prev => [...prev, {
            questionText: currentQuestion.question_text,
            yourAnswer: selectedAnswer,
            correctAnswer: currentQuestion.correct_answer,
            difficulty: currentDifficulty
        }]);
    }
    
    setTimeout(async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer('');
            setIsAnswered(false);
        } else {
            await handleQuizCompletion();
        }
    }, 1500);
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
          Final Difficulty Level: {currentDifficulty}
      </Typography>
      <Typography variant="body1" gutterBottom>
          Score: {score} out of {questions.length} ({((score/questions.length) * 100).toFixed(1)}%)
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {currentDifficulty === 'hard' && score >= (questions.length * 0.7)
              ? "Congratulations! You've mastered this topic!"
              : currentDifficulty === 'easy' && score >= (questions.length * 0.7)
              ? "Good job! Try medium difficulty next time!"
              : currentDifficulty === 'medium' && score < (questions.length * 0.7)
              ? "Keep practicing! You'll improve!"
              : "Practice more to improve your score!"}
      </Typography>

      {wrongAnswers.length > 0 && (
          <Box sx={{ mt: 3, width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom>
                  Review Incorrect Answers:
              </Typography>
              {wrongAnswers.map((wrong, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                      <Typography variant="body1" gutterBottom>
                          Question: {wrong.questionText}
                      </Typography>
                      <Typography variant="body2" color="error">
                          Your Answer: {wrong.yourAnswer}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                          Correct Answer: {wrong.correctAnswer}
                      </Typography>
                  </Box>
              ))}
          </Box>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={onClose}>
              Close Quiz
          </Button>
          <Button 
              variant="outlined" 
              onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setWrongAnswers([]);
                  setShowResult(false);
                  setSelectedAnswer('');
                  setIsAnswered(false);
                  setHasChangedDifficulty(false);
                  onDifficultyChange('medium'); // Always start with medium on retry
              }}
          >
              Try Again
          </Button>
      </Box>
  </Box>
);

  const QuestionScreen = () => {
    if (!currentQuestion) return null;

    // Safely parse options
    let questionOptions = [];
    try {
      questionOptions = typeof currentQuestion.options === 'string' 
        ? JSON.parse(currentQuestion.options) 
        : currentQuestion.options;
    } catch (error) {
      console.error('Error parsing options:', error);
      questionOptions = [];
    }
    return (
      <>
        <Box sx={{ width: '100%', mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Box sx={{ 
            mt: 1, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                bgcolor: currentDifficulty === 'easy' ? 'success.light' 
                      : currentDifficulty === 'medium' ? 'warning.light' 
                      : 'error.light',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 'medium'
              }}
            >
              {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Difficulty
            </Typography>
            <Typography variant="body2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
          </Box>
        </Box>
    
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {currentQuestion.question_text}
        </Typography>
    
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.isArray(questionOptions) && questionOptions.map((option, index) => (
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
  };

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
        {tutorial?.title ? `${tutorial.title} Quiz` : 'Quiz'}
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <CircularProgress />
          </Box>
        ) : showResult ? (
          <ResultScreen />
        ) : (
          <QuestionScreen />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;