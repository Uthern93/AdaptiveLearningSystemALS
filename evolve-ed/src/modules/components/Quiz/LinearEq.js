import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function LinearEqQuestion() {
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(false);
  const { width, height } = useWindowSize();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAnswer("");
    setIsCorrect(false);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
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

  return (
    <React.Fragment>
      {isCorrect && <Confetti width={width} height={height} />}
      <Button variant="outlined" onClick={handleClickOpen}>
        Quiz{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Linear Equation Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Solve the linear equation: 5x + 3 = 13
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
              label="x = 5"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="x = 2"
            />
            <FormControlLabel
              value="option3"
              control={<Radio />}
              label="x = 6"
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
