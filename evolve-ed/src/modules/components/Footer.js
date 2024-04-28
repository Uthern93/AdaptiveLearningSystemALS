import React from 'react'
import Box from "@mui/material/Box";
import backgroundImage from '../../img/background5.jpg'
import { Button } from '@mui/material';
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
      <p>Copyright © 2024 Evolve-ed.</p>


    </div>
  )
}

export default Footer