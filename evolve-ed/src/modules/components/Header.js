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
              "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,255,255,0))",
            backdropFilter: "blur(10px)",
            borderRadius: "0 0 20px 20px",
            webkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <Toolbar>
            <div
              style={{ width: "100px", height: "100px", overflow: "hidden" }}
            >
              <img
                src={logo}
                alt="SVG"
                style={{ width: "100%", marginBottom: "-100px" }}
              />
            </div>
            <div className="titleName">Evolve-Ed</div>
            <div
              style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                color="secondary"
                style={{
                  fontSize: "1.5rem",
                  color: "black",
                  padding: "12px 24px",
                }}
                onClick={handleLoginButtonClick}

              >
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

    </React.Fragment>
  );
}


export default Header