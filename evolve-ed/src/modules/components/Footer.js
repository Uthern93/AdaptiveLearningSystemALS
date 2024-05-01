import React from 'react'
import Box from "@mui/material/Box";
import backgroundImage from '../../img/background5.jpg'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography
      variant="head"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://evolve-ed.netlify.app/">
        evolve-ed
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
      flexDirection: "column", // Display flex items in a column
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      boxSizing: "border-box",
      padding: "20px",
    }}
  >
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default Footer