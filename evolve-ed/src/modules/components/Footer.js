import React from 'react'
import Box from "@mui/material/Box";
import backgroundImage from '../../img/background5.jpg'
import { Button } from '@mui/material';
function Footer() {
  return (
    <div
    style={{

      background: "#b6977d",
      display: "flex",
      flexDirection: "column", // Display flex items in a column
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      boxSizing: "border-box",
      padding: "20px",
    }}
  >
      {/* Content of your footer */}
      <p>This is your footer content.</p>

      <p>This is your footer content.</p>


    </div>
  )
}

export default Footer