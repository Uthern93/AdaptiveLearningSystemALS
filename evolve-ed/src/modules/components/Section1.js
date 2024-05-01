import React from "react";
import backgroundImage from "../../img/back.jpg";
import scroll from "../../img/down.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Stack from "@mui/material/Stack";
import {simplify} from 'mathjs'

function Section1() {
  const navigate = useNavigate();
  const test = simplify('3 + 2 / 4').toString();

  return (
    <div
      style={{
        // backgroundImage: `url(${backgroundImage})`, 
        // backgroundSize: "cover",
        // backgroundPosition: "center", 
        background: "linear-gradient(to top, #c69361, #5D93C8)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <Header />
      <div
        style={{
          position: "relative", 
          zIndex: 1,
          color: "#323232",
          textAlign: "center",
        }}
      >
        <h1 className="header1" style={{
            color: "#323232",
            margin: "0", marginBottom: "1px" 
          
          }}>Adaptive Learning{test}</h1>
          <div>
          <p style={{ margin: "0"}}>Fuel Your Learning Journey, At Your Pace, Your Way.</p>
          <p style={{ margin: "0", marginBottom: "10px" }}>Unlock Your Potential, Every Day</p>
        </div>      <Button
          style={{
            color: "#323232",
            borderColor: "#323232",
            fontSize: "1.5rem",
          }}
          variant="outlined"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </div>
      <div className="main" id="section1"></div>
      <a
        className="pulse"
        href="#section2"
        style={{
          position: "absolute",
          bottom: "5%", 
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          width: "40px", 
          height: "40px", 
          backgroundImage: `url(${scroll})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "25px 40px",
          backgroundPositionX: "center",

        }}
      />
    </div>
  );
}

export default Section1;
