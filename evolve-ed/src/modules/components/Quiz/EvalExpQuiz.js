import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";

export default function EvalExpQuiz() {
  const [open, setOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function generateEquation() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return `${a}x + ${b}y`;
  }

  function evaluateEquation(expression, x, y) {
    const parsedExpression = expression
      .replace("x", "*" + x)
      .replace("y", "*" + y);
    return eval(parsedExpression);
  }

  const equation = generateEquation();
  const xValue =Math.floor(Math.random() * 10) + 1;
  const yValue = Math.floor(Math.random() * 10) + 1;
  const result = evaluateEquation(equation, xValue, yValue);
  React.useEffect(() => {
    setCorrectAnswer(result); // Set correctAnswer when component mounts
  }, [result]);

  const checkAnswer = (userEnteredAnswer) => {
    console.log("User entered answer:", typeof userEnteredAnswer.toString());
    console.log("Correct answer:", typeof correctAnswer.toString());
    if (
      userEnteredAnswer.toLowerCase().toString() === correctAnswer.toString()
    ) {
      console.log("correct");
      Correct(userEnteredAnswer);
    } else {
      console.log("wrong");

      TryAgain(userEnteredAnswer);
    }
  };

  const Correct = (userEnteredAnswer) =>
    toast.success(`${userEnteredAnswer.toLowerCase()} is the correct answer 🎉`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const TryAgain = (userEnteredAnswer) =>
    toast.warn(
      `${userEnteredAnswer.toLowerCase()} was incorrect try Again 🔁`,
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
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Quiz{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const userEnteredAnswer = formData.get(
              "Evaluate expression answer"
            );
            checkAnswer(userEnteredAnswer);

            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The randomly generated equation is: <em>{equation}</em><br />
            Given <strong>x = {xValue} </strong>and<strong> y = {yValue}</strong>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="Evaluate expression answer"
            label="Answer"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Check</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </React.Fragment>
  );
}
