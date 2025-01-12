import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
  return (
    <Typography variant="head" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="">
        ALS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function Footer() {
  return (
    <div
      style={{
        background: "#175060",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

export default Footer;
