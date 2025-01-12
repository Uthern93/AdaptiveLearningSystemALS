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
import { useLocation, useNavigate } from "react-router-dom";

function Subjects() {
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();

  console.log("Received Username:", username); 

  useEffect(() => {
    if (username) {
      welcome(username);
    }
  }, [username]);

  const welcome = (username) => {
    if (username) {
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
      <Button onClick={() => navigate("/dashboard", { state: { username } })}>
  Dashboard
</Button>
      <h1>Subjects</h1>
      <div className="flex-container">
        <SubjectCard className="flex-item"/>
      </div>
    </>
  );
}

export default Subjects;
