import React from "react";
import git from "../../img/test.png";

function Section3() {
  return (
    <div
      id="section3"
      style={{
        background: "linear-gradient(to top, #175060, #5D93C8)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <img
        src={git}
        alt="SVG"
        style={{ width: "100%", marginBottom: "-100px" }}
      />
    </div>
  );
}

export default Section3;
