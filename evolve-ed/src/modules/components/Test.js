import React from 'react'
import backgroundImage from '../../img/background4.jpg'
import { Button } from '@mui/material';
function Test() {
  return (
    <div  style={{ width: "100%", height: "100%"}}>
    <h1
      className="header1"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1, // Bring the text to the front
        color: "white", // Text color
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
        top: 0,
      }}
      src={backgroundImage}
      alt="increase priority"
    />
    <Button
      style={{
        position: "absolute",
        top: "65%",
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

export default Test