import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Box, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container
} from '@mui/material';
import axiosBE from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import TutorialCard from "../components/TutorialCard"; // Assuming you have a TutorialCard component
import QuizModal from "../components/QuizModal"; // Assuming you will create a QuizModal component
import './ALS.css'

const Tutorials = () => {
  const { subjectId } = useParams(); // Fetch the subject ID from the URL
  const [tutorials, setTutorials] = useState([]); // Store tutorials
  const [open, setOpen] = useState(false); // Control modal visibility
  const [newTutorial, setNewTutorial] = useState({ 
    title: '', 
    description: '', 
    content_type: '', 
    url: '' 
  });
  const [quizOpen, setQuizOpen] = useState(false); // Control quiz modal visibility
  const [quizQuestions, setQuizQuestions] = useState([]); // Store quiz questions
  const [selectedTutorial, setSelectedTutorial] = useState(null); // Store the selected tutorial
  const navigate = useNavigate();
  const [quizCreateOpen, setQuizCreateOpen] = useState(false);
  const [selectedTutorialForQuiz, setSelectedTutorialForQuiz] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    options: ['', '', '', ''], // Array of 4 options
    correct_answer: '',
    difficulty_level: 'medium'
  });
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');
  const [allQuestions, setAllQuestions] = useState([]); // Store all questions
  

  // Difficulty level options
  const difficultyLevels = ['easy', 'medium', 'hard'];

  // Handle opening quiz creation dialog
  const handleCreateQuizClick = (tutorial) => {
    setSelectedTutorialForQuiz(tutorial);
    setQuizCreateOpen(true);
  };

  // Handle question input change
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle option change
  const handleOptionChange = (index, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  // Handle adding new question
  const handleAddQuestion = () => {
    // Validation
    if (!newQuestion.question_text.trim()) {
      toast.error('Question text is required!');
      return;
    }
    if (newQuestion.options.some(opt => !opt.trim())) {
      toast.error('All options must be filled!');
      return;
    }
    if (!newQuestion.correct_answer) {
      toast.error('Correct answer must be selected!');
      return;
    }

    // Save question to database
    axiosBE.post(`/tutorials/${selectedTutorialForQuiz.id}/questions`, {
      ...newQuestion,
      tutorial_id: selectedTutorialForQuiz.id
    })
      .then(response => {
        toast.success('Question added successfully!');
        setNewQuestion({
          question_text: '',
          options: ['', '', '', ''],
          correct_answer: '',
          difficulty_level: 'medium'
        });
        // Optionally close the dialog or keep it open for adding more questions
      })
      .catch(error => {
        console.error('Error adding question:', error);
        toast.error('Failed to add question');
      });
  };

  // Content type options
  const contentTypes = [
    'video',
    'article',
    'pdf',
    'presentation',
    'interactive'
  ];

  // Fetch tutorials from DB based on subjectId
  useEffect(() => {
    axiosBE.get(`/subjects/${subjectId}/tutorials`) // Replace with your API endpoint for tutorials
      .then(response => {
        setTutorials(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching tutorials:', error);
        toast.error('Failed to fetch tutorials');
      });
  }, [subjectId]);

  // Fetch quiz questions when a tutorial is clicked
  const handleTutorialClick = (tutorial) => {
    setSelectedTutorial(tutorial);
    fetchQuizQuestions(tutorial.id); // No difficulty parameter for initial fetch
};

const fetchQuizQuestions = async (tutorialId, difficulty = 'medium') => {
  try {
      const response = await axiosBE.get(`/tutorials/${tutorialId}/questions`, {
          params: { difficulty_level: difficulty }
      });
      
      console.log('API Response:', response.data);
      
      // Store all questions
      const questions = Array.isArray(response.data) ? response.data : [];
      setAllQuestions(questions);
      
      // Filter questions by difficulty
      const filteredQuestions = questions.filter(q => q.difficulty_level === difficulty);
      
      if (filteredQuestions.length === 0) {
          toast.info(`No questions available for ${difficulty} difficulty`);
          setQuizOpen(false);
          return;
      }
      
      setQuizQuestions(filteredQuestions);
      setCurrentDifficulty(difficulty);
      setQuizOpen(true);
      
  } catch (error) {
      console.error('Error fetching quiz questions:', error);
      toast.error('Failed to fetch quiz questions');
      setQuizOpen(false);
  }
};

const handleDifficultyChange = async (newDifficulty) => {
  if (selectedTutorial) {
      await fetchQuizQuestions(selectedTutorial.id, newDifficulty);
  }
};

  // Open/close modal
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input change for new tutorial
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTutorial((prev) => ({ ...prev, [name]: value }));
  };

  // Modified handleAddTutorial with validation
  const handleAddTutorial = () => {
    // Validation
    if (!newTutorial.title.trim()) {
      toast.error('Tutorial title is required!');
      return;
    }
    if (!newTutorial.content_type) {
      toast.error('Content type is required!');
      return;
    }
    if (!newTutorial.url.trim()) {
      toast.error('URL is required!');
      return;
    }

    // URL validation
    try {
      new URL(newTutorial.url);
    } catch (e) {
      toast.error('Please enter a valid URL');
      return;
    }

    // Save to database
    axiosBE.post(`/subjects/${subjectId}/tutorials`, newTutorial)
      .then(response => {
        setTutorials((prev) => [...prev, response.data]);
        toast.success('Tutorial added successfully!');
        setNewTutorial({ 
          title: '', 
          description: '', 
          content_type: '', 
          url: '' 
        });
        handleClose();
      })
      .catch(error => {
        console.error('Error adding tutorial:', error);
        toast.error('Failed to add tutorial');
      });
    };

    // Add floating shapes
  const renderFloatingShapes = () => {
    const shapes = [];
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 50 + 10}px`,
        height: `${Math.random() * 50 + 10}px`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${Math.random() * 10 + 10}s`
      };
      shapes.push(<div key={i} className="shape" style={style} />);
    }
    return shapes;
  };

  return (
    <Box
      className="animated-background"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '2rem'
      }}
    >
      <div className="floating-shapes">
        {renderFloatingShapes()}
      </div>

      <ToastContainer />
      <Container maxWidth="md">
        <Box
          className="content-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 3,
            pb: 3,
            mt: 3,
            px: 3,
            borderRadius: '16px',
          }}
        >
          {/* Navigation and Header Section */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Button 
              variant="contained" 
              onClick={() => navigate("/subjects")}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Back to Subjects
            </Button>
            <Button 
              variant="contained" 
              onClick={handleClickOpen}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Add New Tutorial
            </Button>
          </Box>

          {/* Title Section */}
          <Box
            sx={{
              mb: 4,
              textAlign: 'center'
            }}
          >
            <h1 style={{ 
              color: 'white',
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: 600,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Tutorials for Subject
            </h1>
          </Box>

          {/* Tutorials Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',            // 1 column for mobile
                sm: 'repeat(2, 1fr)'  // 2 columns for all larger screens
              },
              gap: 3,
              width: '100%',
              p: 2
            }}
          >
            {tutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.id}
                tutorial={tutorial}
                onClick={() => handleTutorialClick(tutorial)}
                onCreateQuiz={(tutorial) => handleCreateQuizClick(tutorial)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
            />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Add Tutorial Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
          Add New Tutorial
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Tutorial Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTutorial.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newTutorial.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="content-type-label">Content Type</InputLabel>
            <Select
              labelId="content-type-label"
              name="content_type"
              value={newTutorial.content_type}
              label="Content Type"
              onChange={handleInputChange}
            >
              {contentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            name="url"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={newTutorial.url}
            onChange={handleInputChange}
            helperText="Enter the URL for the tutorial content"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleAddTutorial} 
            variant="contained"
            sx={{
              px: 3,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
      open={quizCreateOpen} 
      onClose={() => setQuizCreateOpen(false)}
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        Create Quiz Question for {selectedTutorialForQuiz?.title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          name="question_text"
          label="Question Text"
          type="text"
          fullWidth
          variant="outlined"
          value={newQuestion.question_text}
          onChange={handleQuestionChange}
          sx={{ mb: 3 }}
        />

        {/* Options */}
        <Box sx={{ mb: 3 }}>
          {newQuestion.options.map((option, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`Option ${index + 1}`}
              type="text"
              fullWidth
              variant="outlined"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}
        </Box>

        {/* Correct Answer Selection */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Correct Answer</InputLabel>
          <Select
            name="correct_answer"
            value={newQuestion.correct_answer}
            label="Correct Answer"
            onChange={handleQuestionChange}
          >
            {newQuestion.options.map((option, index) => (
              <MenuItem key={index} value={option} disabled={!option.trim()}>
                {option || `Option ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Difficulty Level */}
        <FormControl fullWidth>
          <InputLabel>Difficulty Level</InputLabel>
          <Select
            name="difficulty_level"
            value={newQuestion.difficulty_level}
            label="Difficulty Level"
            onChange={handleQuestionChange}
          >
            {difficultyLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={() => setQuizCreateOpen(false)}>Close</Button>
        <Button 
          onClick={handleAddQuestion}
          variant="contained"
          sx={{
            px: 3,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Add Question
        </Button>
      </DialogActions>
    </Dialog>

      {/* Quiz Modal */}
      {quizOpen && (
        <QuizModal
            questions={quizQuestions}
            tutorial={selectedTutorial}
            onClose={() => {
                setQuizOpen(false);
                setQuizQuestions([]);
                setAllQuestions([]);
                setCurrentDifficulty('medium');
            }}
            onDifficultyChange={handleDifficultyChange}
            currentDifficulty={currentDifficulty}
        />
    )}
    </Box>
  );
};

export default Tutorials;
