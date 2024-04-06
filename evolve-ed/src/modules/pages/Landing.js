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
import Section3 from "../components/Section3";
import Footer from "../components/Footer";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GetStarted from "../components/GetInTouch";
import GetInTouch from "../components/GetInTouch";

import Stack from "@mui/material/Stack";

function Landing() {
  return (
    <React.Fragment>
              {/* <Header /> */}

      <Stack spacing={0}>

      <Section1 />
      <Section2 />
      <Section3/>


        <Footer />
      </Stack>
    </React.Fragment>
  );
}

export default Landing;
