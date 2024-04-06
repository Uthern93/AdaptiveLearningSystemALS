import React from "react";
import Box from "@mui/material/Box";
import backgroundImage from "../../img/blend.jpg";
import { Button } from "@mui/material";

function Section2() {
  return (
    
    <div id="section2"
      style={{
        // backgroundImage: `url(${backgroundImage})`, 
        // backgroundSize: "cover", // Cover the entire container
        // backgroundPosition: "center", // Setting the background image
        background: "linear-gradient(to top, #5D93C8, #c69361)",
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
    
      <h1>
        About Evolve-ed
      </h1>
      <p style={{textAlign: "center", width: "50%"}}>
      Welcome to Evolve-ed where innovation meets adaptation seamlessly.
      Evolve-ed, harnesses the power of artificial intelligence to revolutionize your experience. 
      With cutting-edge AI technology Evolve-ed doesn't just react; it learns, evolves, and adapts through intricate patterns in your usage,
      ensuring that every interaction feels tailor-made for you. 
      Whether you're exploring our diverse range of features or delving into our immersive content, 
      our platform is designed to understand your needs and preferences, 
      providing a personalized journey like no other. 
      Join us in shaping the future of technology, 
      where AI doesn't just follow commands, but anticipates your desires, 
      making every moment exceptional.
      </p>


    </div>
  );
}

export default Section2;
