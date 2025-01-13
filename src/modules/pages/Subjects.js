import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Container } from '@mui/material';
import SubjectCard from "../components/SubjectCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosBE from '../../api/axios';
import './ALS.css'; // Import the CSS file

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axiosBE.get('/subjects')
      .then(response => {
        setSubjects(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
        toast.error('Failed to fetch subjects');
      });
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    if (!newSubject.name.trim()) {
      toast.error('Subject name is required!');
      return;
    }

    axiosBE.post('/api/subjects', newSubject)
      .then(response => {
        setSubjects((prev) => [...prev, response.data]);
        toast.success('Subject added successfully!');
        setNewSubject({ name: '', description: '' });
        handleClose();
      })
      .catch(error => {
        console.error('Error adding subject:', error);
        toast.error('Failed to add subject');
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
      <Container 
        maxWidth="md" // Changed from xl to md for a more contained width
        sx={{
          position: 'relative',
          zIndex: 2
        }}
      >
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
              onClick={() => navigate("/")}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              Back to Home
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
              Add New Subject
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
              Manage Subjects
            </h1>
          </Box>

          {/* Subjects Grid - Modified for exactly 2 columns */}
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
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => navigate(`/tutorials/${subject.id}`)}
                sx={{
                  height: '100%', // Ensure consistent height
                  display: 'flex',
                  flexDirection: 'column'
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Dialog remains the same */}
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
          Add New Subject
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
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
            sx={{ mb: 2 }}
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
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            onClick={handleClose}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddSubject} 
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
    </Box>
  );
};

export default Subjects;