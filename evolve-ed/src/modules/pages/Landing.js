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
import Test from "../components/Test"
import Test2 from "../components/Test2"

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

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,255,255,0))",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
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
                  color: "white",
                  padding: "12px 24px",
                }}
              >
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
   
<Test/>
<br/>
<Test2/>
     
      {/* <Box sx={{ my: 2 }}>
        {[...new Array(120)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join("\n")}
      </Box> */}
    </React.Fragment>
  );
}
