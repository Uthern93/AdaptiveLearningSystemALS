import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from "react-toastify";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function CombTermsQuiz() {
  const [open, setOpen] = React.useState(false);
  const [expression, setExpression] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(false); 
  const { width, height } = useWindowSize();

  const handleClickOpen = () => {
    const { expression, answer } = generateEquation();
    setExpression(expression);
    setAnswer(answer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function generateEquation() {
    // Hardcoded expression and answer
    const expression = "-10x - 6x + 3z - 6z";
    const answer = { x: -16, z: -3 };

    return { expression, answer };
}
function checkAnswer(userAnswer){
  const keys = Object.keys(answer);
  const values = keys.map(key => answer[key]);
  console.log(values[0]+keys[0]);
  console.log(values[1]+keys[1]);

  let val0;
  let val1;
  if (values[0]){
    val0 = values[0].toString()
  }else{
    val0 = "+"

  }
  if (values[1]){
    val1 = values[1].toString()
  }else{
    val1 = "+"
  }
  
  const newAnswer = val0+keys[0]+ val1+keys[1];
  if (userAnswer === newAnswer) {
    console.log("me",userAnswer ,"ans", newAnswer)
    console.log("Correct!");
    Correct();
    setIsCorrect(true); // Set the state to true if the answer is correct

  } else {
    console.log("me",userAnswer ,"ans", newAnswer)
    TryAgain()
    console.log("Incorrect!");
  }
}
const Correct = (userEnteredAnswer) =>
toast.success(`Correct answer 🎉`, {
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
  `Try Again 🔁`,
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
                  {isCorrect && <Confetti width={width} height={height} />} {/* Conditionally render Confetti */}

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const userAnswer = formJson['Combining like terms'];
           checkAnswer(userAnswer);
            handleClose();
          },
        }}
      >
        <DialogTitle>Combining Like Terms Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Solve the following equation: {expression}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="Combining like terms"
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
