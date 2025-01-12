import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import axios from 'axios';
import SubjectCard from "../components/SubjectCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]); // Store subjects
  const [open, setOpen] = useState(false); // Control modal visibility
  const [newSubject, setNewSubject] = useState({ name: '', description: '' }); // New subject data
  const navigate = useNavigate();

  // Fetch subjects from DB on load
  useEffect(() => {
    axios.get('/api/subjects') // Replace with your API endpoint
      .then(response => {
        setSubjects(response.data); // Load subjects into state
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
        toast.error('Failed to fetch subjects');
      });
  }, []);

  // Open/close modal
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleAddSubject = () => {
    if (!newSubject.name.trim()) {
      toast.error('Subject name is required!');
      return;
    }

    // Save to database
    axios.post('/api/subjects', newSubject) // Replace with your API endpoint
      .then(response => {
        setSubjects((prev) => [...prev, response.data]); // Add new subject to state
        toast.success('Subject added successfully!');
        setNewSubject({ name: '', description: '' }); // Reset form
        handleClose(); // Close modal
      })
      .catch(error => {
        console.error('Error adding subject:', error);
        toast.error('Failed to add subject');
      });
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3, padding: '20px' }}>
        {/* Back to Home Button */}
        <Button variant="contained" onClick={() => navigate("/")} sx={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Back to Home
        </Button>

        {/* Page Title */}
        <h1>Manage Subjects</h1>

        {/* Add New Subject Button */}
        <Button variant="contained" onClick={handleClickOpen} sx={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Add New Subject
        </Button>

        {/* Modal for adding a new subject */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Subject Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newSubject.name}
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
              value={newSubject.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddSubject} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Displaying Subjects */}
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
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => navigate(`/tutorials/${subject.id}`)} // Assuming each subject has a unique ID for its tutorials
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Subjects;
