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
  MenuItem
} from '@mui/material';
import axiosBE from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import TutorialCard from "../components/TutorialCard"; // Assuming you have a TutorialCard component
import QuizModal from "../components/QuizModal"; // Assuming you will create a QuizModal component

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
    axiosBE.get(`/api/subjects/${subjectId}/tutorials`) // Replace with your API endpoint for tutorials
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
    axiosBE.get(`/api/tutorials/${tutorial.id}/questions`) // Fetch quiz questions based on tutorial
      .then(response => {
        setQuizQuestions(Array.isArray(response.data) ? response.data : []);
        setQuizOpen(true); // Open the quiz modal
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
        toast.error('Failed to fetch quiz questions');
      });
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
    axiosBE.post(`/api/subjects/${subjectId}/tutorials`, newTutorial)
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

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3, padding: '20px' }}>
        {/* Back to Subjects Button */}
        <Button variant="contained" onClick={() => navigate("/subjects")} sx={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Back to Subjects
        </Button>

        {/* Page Title */}
        <h1>Tutorials for Subject</h1>

        {/* Add New Tutorial Button */}
        <Button variant="contained" onClick={handleClickOpen} sx={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Add New Tutorial
        </Button>

        {/* Modal for adding a new tutorial */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Tutorial</DialogTitle>
          <DialogContent>
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
              sx={{ marginBottom: '20px' }}
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
              sx={{ marginBottom: '20px' }}
            />

            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddTutorial} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Displaying Tutorials */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 1200,
            padding: '20px',
          }}
        >
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onClick={() => handleTutorialClick(tutorial)} // Trigger quiz modal when tutorial clicked
            />
          ))}
        </Box>
      </Box>

      {/* Quiz Modal */}
      {quizOpen && (
        <QuizModal
          questions={quizQuestions}
          tutorial={selectedTutorial}
          onClose={() => setQuizOpen(false)} // Close quiz modal
        />
      )}
    </>
  );
};

export default Tutorials;
