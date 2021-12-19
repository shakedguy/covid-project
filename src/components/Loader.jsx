import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ width: "100%", my: 10, textAlign: "center" }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
