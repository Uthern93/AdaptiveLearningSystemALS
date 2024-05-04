import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Button color="inherit" href="https://evolve-ed.netlify.app/">
        evolve-ed
      </Button>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Alert({ username }) {
  const { width, height } = useWindowSize();

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate("/login");
  };
  return (
    <React.Fragment>
      <Confetti width={width} height={height} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Your username"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your username is{" "}
            <Typography component="span" fontWeight="bold">
              {username}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function TandC(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [checked, setChecked] = useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleChange = () => {
    setChecked(!checked);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={handleChange} color="primary" />
        }
        label="I agree to the Terms and conditions"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <strong>Introduction to Terms and Conditions</strong>
            <br />
            By agreeing to these terms and conditions, you are consenting to the
            responsible and ethical use of the system. This implies a
            recognition that your name, email address, and any data generated
            through your interaction with the platform, including questions
            asked and answers provided, may be stored and analyzed. This data
            may be utilized for improving the system's functionality, enhancing
            user experience, and conducting research.
            <br />
            <br />
            <strong> Data Collection and Privacy</strong>
            <br />
            It's important to emphasize that while your information may be used
            for these purposes, your privacy remains paramount. Your email will
            never be shared with third parties, and you will not receive
            unsolicited emails as a result of your interaction with the system.
            <br />
            <br />
            <strong>Responsible Use</strong>
            <br />
            Furthermore, it is expected that users engage with the system with
            integrity and sincerity. The purpose of this platform is to
            facilitate learning and personal growth. Therefore, users are
            encouraged to utilize its resources to enhance their understanding
            of various topics and subjects. It is not appropriate to exploit the
            system to gain unfair advantage in academic settings by using its
            features to answer questions or complete assignments prepared by
            educational institutions or teaching staff.
            <br />
            <br />
            <strong> Purpose of the Platform</strong>
            <br />
            By accepting these terms, you acknowledge your commitment to using
            the system responsibly and for its intended purpose of fostering
            genuine learning experiences.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const password = data.get("password");

    const generatedUsername = `${first_name}${last_name.charAt(0)}${
      new Date().getFullYear() % 100
    }`;

    try {
      const response = await fetch(
        "https://bargichk.pythonanywhere.com/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            username: generatedUsername,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        setUsername(generatedUsername);
        setSignUpSuccess(true);
        console.log("Signed up successfully");
      } else {
        console.error(
          "Sign up failed:",
          response.statusText,
          generatedUsername,
          email,
          password
        );
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <TandC />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {signUpSuccess && <Alert username={username} />}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => navigate("/login")} variant="body2">
                  {"Already have an account? Log in"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
