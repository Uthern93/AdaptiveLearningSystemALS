import React from 'react'
import Box from "@mui/material/Box";
import backgroundImage from '../../img/background3.jpg'
import { Button } from '@mui/material';
function Test2() {
  return (
    <div  style={{ width: "100%", height: "100%"}}>
    <h1
      className="header1"
      style={{
        position: "absolute",
        top: "150%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1, // Bring the text to the front
        color: "red", // Text color
      }}
    >
      {" "}
      Adaptive Learning
    </h1>

    <img
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "absolute", // Set position to absolute
        top: '100%',
      }}
      src={backgroundImage}
      alt="increase priority"
    />
    <Button
      style={{
        position: "absolute",
        top: "165%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1, // Bring the text to the front
        color: "black",
        borderColor: "black",
        fontSize: '1.5rem' // Change border color
      }}
      variant="outlined"
    >
      Register
    </Button>
    </div>
  )
}

export default Test2