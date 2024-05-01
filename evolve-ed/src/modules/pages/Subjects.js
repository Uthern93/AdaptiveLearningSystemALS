import React, { useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import CalculateIcon from "@mui/icons-material/Calculate";
import SubjectCard from "../components/SubjectCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";

function Subjects() {
  const location = useLocation();
  const { username } = location.state || {};

  console.log("Received Username:", username); // Check if username is received correctly

  useEffect(() => {
    if (username) {
      welcome(username);
    }
  }, [username]);

  const welcome = (username) => {
    // Check if username is defined before accessing its properties
    if (username) {
      // Extract first name and cut off the last 3 characters
      const firstName = username.slice(0, -3);

      toast(`👋 Welcome back, ${firstName}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <div>Subjects</div>
      <div className="flex-container">
        <SubjectCard className="flex-item"/>

      </div>
    </>
  );
}

export default Subjects;
