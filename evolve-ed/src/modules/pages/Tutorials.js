import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Variables from "../components/Tutorials/Variables";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import VariableQuiz from "../components/Quiz/VariableQuiz";
import CombTermsQuiz from "../components/Quiz/CombTermsQuiz";
import EquivalentExp from "../components/Quiz/EquivalentExp";
import EvalExpQuiz from "../components/Quiz/EvalExpQuiz";
import Inequalities from "../components/Quiz/Inequalities";
import LinearEq from "../components/Quiz/LinearEq";

const steps = [
  "Variables",
  "Evaluating an expression",
  "Combining like terms",
  "Equivalent expressions",
  "Linear equations",
  "Inequalities",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { width, height } = useWindowSize();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5">Variables</Typography>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Typography variant="body1">
                  In math, variables are like placeholders for numbers. Instead
                  of using specific numbers, we use letters or symbols to
                  represent unknown or changing values. They help us solve
                  problems by letting us work with general situations rather
                  than specific instances. For example, in an equation like "2x
                  + 3 = 7," "x" is a variable representing an unknown number
                  that we can find using algebraic methods.
                </Typography>
              </div>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  paddingBottom: "50px",
                }}
              >
                <Typography variant="body1">
                  For example, in an equation like <strong><br/> 2x + 3 = 7</strong>
                  <strong><br/> x </strong> is a
                  variable representing an unknown number that we can find using
                  algebraic methods.
                </Typography>
              </div>

              <VariableQuiz />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5">Evaluating an expression</Typography>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Typography variant="body1">
                  When you're asked to evaluate an expression that has more than
                  one variable, it means you need to plug in numbers for each
                  variable and then solve the expression. So, instead of seeing
                  letters like x or y, you'll see numbers. This helps us find
                  out what the expression equals.
                </Typography>
              </div>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  paddingBottom: "50px",
                }}
              >
                <Typography variant="body1">
                  For example, if you have the expression{" "}
                  <strong>
                    <br />
                    3x+2y
                    <br />
                  </strong>{" "}
                  and you're told{" "}
                  <strong>
                    <br />
                    x=4{" "}
                  </strong>
                  and
                  <strong>
                    {" "}
                    y=5,
                    <br />{" "}
                  </strong>
                  you replace x with 4 and y with 5, giving you <br />
                  <strong>3(4) + 2(5)</strong>.<br /> Then you just solve it
                  like a regular math problem to find the answer. Which in this
                  case would be <br />
                  <strong>22</strong>
                </Typography>
              </div>

              <EvalExpQuiz />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5">Evaluating an expression</Typography>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Typography variant="body1">
                  In algebra, terms are the building blocks of expressions. Each
                  term consists of a coefficient (a number) and a variable (like
                  x or y), which are usually multiplied together. When you see
                  expressions like "2x + 3x", where the variables are the same
                  (in this case, both x), these are called like terms. Like
                  terms can be combined by adding or subtracting their
                  coefficients.{" "}
                </Typography>
              </div>
              <div
                style={{
                  width: "40%",
                  margin: "0 auto",
                  textAlign: "center",
                  paddingBottom: "50px",
                }}
              >
                <Typography variant="body1">
                  For example: Consider the expression: 
                  <br/> <strong>2x + 3y - 4x - 5y </strong><br/> 
                  Here, we have four terms:  
                  <br/> <strong>2x,  3y, -4x, and -5y </strong>.<br/>
                  Terms 2x and -4x both have the
                  variable  x, making them like terms. Terms 3y and 5y both have the variable  y, making them like terms. We can
                  combine like terms separately: 
                  <br/>For the x terms: <strong>2x - 4x = (2 - 4)x= -2x  </strong>
                  <br/>For the y terms:  <strong>3y - 5y = (3 - 5)y = -2y </strong> <br/>
                  So, after combining
                  like terms, our expression simplifies to:<br/>  <strong>-2x-2y </strong><br/>
                </Typography>
              </div>
              <CombTermsQuiz />
            </div>
          </>
        );

      case 3:
        return <></>;
      case 4:
        return <Typography>Custom content for Step 4</Typography>;
      case 5:
        return <Typography>Custom content for Step 4</Typography>;
      case 6:
        return <Typography>Custom content for Step 4</Typography>;
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <h1
        style={{
          color: "#323232",
          margin: "0",
          marginBottom: "1px",
          textAlign: "center",
        }}
      >
        Tutorials
      </h1>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Confetti width={width} height={height} />

            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {getStepContent(activeStep)}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
