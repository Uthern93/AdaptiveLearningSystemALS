import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

export default function EquivalentExp() {
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(false);
  const { width, height } = useWindowSize();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCorrect(false);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isCorrectAnswer = selectedAnswer === "option1";
    if (isCorrectAnswer) {
      setIsCorrect(true);
      Correct(selectedAnswer);
      console.log("isCorrect:", isCorrect);
    } else {
      setIsCorrect(false);
      TryAgain(selectedAnswer);
    }

    console.log("isCorrect:", isCorrect);

    handleClose();
  };

  const Correct = (userEnteredAnswer) => {
    toast.success(
      `${userEnteredAnswer.toLowerCase()} is the correct answer 🎉`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  const TryAgain = (userEnteredAnswer) => {
    toast.warn(
      `${userEnteredAnswer.toLowerCase()} was incorrect. Try Again! 🔁`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  return (
    <React.Fragment>
      {isCorrect && <Confetti width={width} height={height} />}

      <Button variant="contained" onClick={handleClickOpen}>
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
        <DialogTitle>Equivalent Expression Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which of the following expressions is equivalent to 2x + 3?
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
              label="3 + 2x"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="x + 2 + x"
            />
            <FormControlLabel
              value="correct_answer"
              control={<Radio />}
              label="2 + x + 3"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Check</Button>
        </DialogActions>
        {isCorrect && (
          <DialogContent>
            <DialogContentText>
              That's correct! This question should be an equivalent expression
              question.
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
