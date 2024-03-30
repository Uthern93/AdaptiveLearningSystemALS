import React, { useState } from "react";

function AlgebraSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");
  const [workings, setWorkings] = useState("");
  const [split, setSplit] = useState("");
  const [likeTerms, setLikeTerms] = useState("");
  const [addStrings, setAddStrings] = useState("");
  const [addNums, setAddNums] = useState("");

  const symbols = ["+", "-", "/", "x"];

  const solveEquation = () => {
    // Splitting the equation to extract lhs and rhs
    const [lhs, rhs] = equation.split("=").map((side) => side.trim());
    setSplit([lhs, " and ", rhs]);
    //console.log(lhs, rhs);
    const lProcess = processedNum(lhs);
    const rProcess = processedNum(rhs);
    const join1 = joinAdd(lProcess[1]);
    const join2 = joinAdd(rProcess[1]);

    console.log("Left", lProcess);
    console.log("Left Second number", join1);
    console.log("Right Numbers", rProcess);
    console.log("Right Second number", join2);
    setLikeTerms([
      "(",
      lProcess[0],
      " + ",
      negateString(rProcess[0]),
      ") = (",
      join2,
      " + ",
      -1 * join1,
      ")",
    ]);
    const calc1 = calculateExpression(lProcess[0], negateString(rProcess[0]));
    const calc2 = join2 + -1 * join1;
    setAddStrings(["(", calc1, ") "]);
    setAddNums(["(", calc2, ")"]);
    setSolution(solved(calc1, calc2));
    //}
  };
  function isNumber(str) {
    return /^[+\-]?\d*\.?\d+([+\-]\d*\.?\d+)*$/.test(str);
  }

  const processedNum = (equation) => {
    const left = equation.split(" ").map((side) => side.trim());
    //console.log("left side", left);
    const lvalues = [];
    let coefficient;

    for (let i = 0; i < left.length; i++) {
      if (isNumber(left[i]) || left[i] === "-" || left[i] === "+") {
        lvalues.push(left[i]);
      } else {
        lvalues.push("0");
        coefficient = left[i];
      }
    }
    return [coefficient, lvalues];
  };

  function joinAdd(arr) {
    const joiner = arr.join("");
    let math = eval(joiner);
    return math;
  }
  function negateString(str) {
    if (str.startsWith("-")) {
      return str.substring(1); // Remove the negative sign
    } else {
      return "-" + str; // Add the negative sign
    }
  }
  function calculateExpression(expression1, expression2) {
    const match1 = expression1.match(/(-?\d+)/);
    const match2 = expression2.match(/(-?\d+)/);

    const coefficient1 = match1 ? parseInt(match1[1]) : 0;
    const coefficient2 = match2 ? parseInt(match2[1]) : 0;

    const resultCoefficient = coefficient1 + coefficient2;
    console.log("#########", match1);

    const result = resultCoefficient + expression1[expression1.length - 1];

    return result;
  }
  const solved = (stri, num) => {
    const coef = parseFloat(stri.slice(0, -1));
    const number = parseFloat(num);
    const result = number / coef;
    if (result % 1 === 0) {
      return result;
    }else{
        return "Working on it"
    }
  };

  return (
    <div>
      <h1>Linear Equation Solver</h1>
      <input
        type="text"
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
        placeholder="Enter equation (e.g., 4z + 5 = 5z + 2)"
      />
      <button onClick={solveEquation}>Solve</button>
      <div>
        {solution && (
          <div>
            <h2>Solution:</h2>
            <p>{solution}</p>
            <h2>Workings:</h2>
            <p>{split}</p>
            <p>{likeTerms}</p>
            <p>
              {addStrings}+ {addNums}
            </p>
            <p>{solution}</p>

            <></>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlgebraSolver;
