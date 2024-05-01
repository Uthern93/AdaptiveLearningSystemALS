import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";

// Function definition
function generateEquation() {
  // Generate random coefficients and constant
  const a = Math.floor(Math.random() * 10) + 1; // Random coefficient for x
  const b = Math.floor(Math.random() * 10) + 1; // Random constant
  const c = Math.floor(Math.random() * 20) + 5; // Random constant for result

  const variables = ["x", "y", "z", "a", "b", "c"];
  const variable = variables[Math.floor(Math.random() * variables.length)];

  const equation = `${a}${variable} + ${b} = ${c}`;

  return { equation, variable };
}

export default function VariableQuiz() {
  const [open, setOpen] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const { equation, variable } = React.useMemo(generateEquation, []); // Generate equation when component mounts

  React.useEffect(() => {
    setCorrectAnswer(variable); // Set correctAnswer when component mounts
  }, [variable]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkAnswer = (userEnteredAnswer) => {
    console.log("User entered answer:", userEnteredAnswer);
    console.log("Correct answer:", correctAnswer);
    if (userEnteredAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      Correct(userEnteredAnswer);
    } else {
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
    toast.warn(`${userEnteredAnswer.toLowerCase()} was incorrect try Again 🔁`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const userEnteredAnswer = formData.get("Variable quiz answer");
            checkAnswer(userEnteredAnswer);
            handleClose();
          },
        }}
      >
        <DialogTitle>Variable Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
          In the equation <em>{equation}</em>, what is the <strong>variable</strong>?
          </DialogContentText>
          <TextField
            autoComplete="nope"
            autoFocus
            required
            margin="dense"
            name="Variable quiz answer"
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
