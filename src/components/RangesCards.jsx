import React from "react";
import { TimeRanges } from "../services/dataService";
import { Card, CardHeader, Typography, Box } from "@mui/material";

const RangesCards = () => {
  console.log(TimeRanges);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {TimeRanges.map((range) => (
        <Card elevation={3} sx={{ bgcolor: "primary.main", my: 8, mx: 2 }}>
          <CardHeader title={range} sx={{ color: "grey.300" }} />
        </Card>
      ))}
    </Box>
  );
};

export default RangesCards;
