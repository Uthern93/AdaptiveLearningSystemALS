import * as React from "react";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Footer from "../components/Footer";

import Stack from "@mui/material/Stack";

function Landing() {
  return (
    <React.Fragment>
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



