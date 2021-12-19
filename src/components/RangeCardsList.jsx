import React from "react";
import { TimeRanges } from "../services/dataService";
import { Card, CardHeader, Typography, Box } from "@mui/material";
import RangeCard from "./RangeCard";

const RangeCardsList = ({ onRangeCardClick }) => {
  const selectedItemHandler = (selectedItem) => {
    onRangeCardClick(selectedItem);
  };
  return (
    <Box sx={{ mb: 0, display: "flex", justifyContent: "center" }}>
      {TimeRanges.map((range) => (
        <RangeCard range={range} onCardClick={selectedItemHandler} />
        // <Card elevation={3} raised sx={{ bgcolor: "primary.main", my: 8, mx: 2 }} onClick={selectedItemHandler}>
        //   <CardHeader title={range} sx={{ color: "grey.300" }} />
        // </Card>
      ))}
    </Box>
  );
};

export default RangeCardsList;
