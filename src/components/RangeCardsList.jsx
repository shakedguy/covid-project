import React from "react";
import { timeRanges } from "../services/dataService";
import { Box } from "@mui/material";
import RangeCard from "./RangeCard";

const RangeCardsList = ({ onRangeCardClick }) => {
  const selectedItemHandler = (selectedItem) => onRangeCardClick(selectedItem);

  return (
    <Box sx={{ mb: 0, display: "flex", justifyContent: "center" }}>
      {timeRanges.map((range) => (
        <RangeCard range={range} onCardClick={selectedItemHandler} />
      ))}
    </Box>
  );
};

export default RangeCardsList;
