import * as React from "react";
import logo from "../../logo.svg";
import backgroundImage from "../../img/background4.jpg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Footer from "../components/Footer";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Header = (props) => {

    function HideOnScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
          target: window ? window() : undefined,
        });
      
        return (
          <Slide appear={false} direction="down" in={!trigger}>
            {children}
          </Slide>
        );
      }
      
      HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        window: PropTypes.func,
      };
      const navigate = useNavigate();

      const handleLoginButtonClick = () => {
        navigate("/Login");
      };

  return  (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(240, 240, 240, 0.1))",
            backdropFilter: "blur(8px)",
            borderRadius: "0 0 12px 12px",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 500,
                fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                color: "#34495e", // A softer, modern dark gray
                textAlign: "center",
              }}
            >
              Adaptive Learning System
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>

  );
}


export default Header