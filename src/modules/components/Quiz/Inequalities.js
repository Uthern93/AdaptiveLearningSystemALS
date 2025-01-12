import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inequalities() {
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer("");
    setIsCorrect(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedAnswer === "option2") {
      setIsCorrect(true);
      Correct(selectedAnswer);
    } else {
      setIsCorrect(false);
      TryAgain(selectedAnswer);
    }
    handleClose();
  };

  const Correct = (userEnteredAnswer) => {
    toast.success(`${userEnteredAnswer} is the correct answer 🎉`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const TryAgain = (userEnteredAnswer) => {
    toast.warn(`${userEnteredAnswer} was incorrect. Try Again! 🔁`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Inequalities Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Solve the inequality: 5x - 7 &gt; 3x + 3
          </DialogContentText>
          <RadioGroup
            aria-label="answer"
            name="answer"
            value={selectedAnswer}
            onChange={handleAnswerChange}
          >
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label="x > 5"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="x < 5"
            />
            <FormControlLabel
              value="option3"
              control={<Radio />}
              label="x = 5"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
