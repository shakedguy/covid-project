import React from "react";
import { TimeRanges } from "../services/dataService";
import { Card, CardHeader } from "@mui/material";

const RangeCardsList = ({ range, onCardClick }) => {
  const onCardClickHandler = (event) => {
    onCardClick(range);
  };
  return (
    <Card elevation={3} raised sx={{ cursor: "pointer", bgcolor: "primary.main", my: 8, mx: 2 }} onClick={onCardClickHandler}>
      <CardHeader title={range.title} sx={{ color: "grey.300" }} />
    </Card>
  );
};

export default RangeCardsList;