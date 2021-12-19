import React, { useState, useEffect } from "react";
import RangeCardsList from "./RangeCardsList";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DatePickers from "./DatePickers";
import PieChart from "./PieChart";
import { createRange } from "../services/helpers";

const Dashboard = () => {
  const [SelectedItem, setSelectedItem] = useState(null);
  const [IsDatePicked, setIsDatePicked] = useState(false);
  const [CustomRange, setCustomRange] = useState(null);
  const [RenderCustom, setRenderCustom] = useState(false);
  const rangeSelectionHandler = (selectedItem) => {
    setIsDatePicked(false);
    setRenderCustom(false);
    setSelectedItem(selectedItem);
  };

  const pickedDatesHandler = (start, end) => {
    setRenderCustom(false);
    setIsDatePicked(true);
    setCustomRange(createRange(start, end));
  };

  const fetchHandler = () => {
    setSelectedItem({ title: SelectedItem.title, dates: CustomRange });
    setIsDatePicked(false);
    setRenderCustom(true);
  };
  return (
    <>
      <Box elevation={3} sx={{ height: 90, my: 3, display: "flex", justifyContent: "left", alignItems: "center" }}>
        <RangeCardsList onRangeCardClick={rangeSelectionHandler} />
        {SelectedItem && SelectedItem.title === "Custom" && <DatePickers onDatePicked={pickedDatesHandler} />}
      </Box>
      {IsDatePicked && (
        <Box elevation={3} sx={{ width: "100%", textAlign: "center" }}>
          <Button variant="contained" sx={{ maxWidth: 120 }} startIcon={<DownloadIcon />} onClick={fetchHandler}>
            Fetch
          </Button>
        </Box>
      )}
      {SelectedItem && SelectedItem.title === "Yesterday" && <PieChart range={SelectedItem} />}
      {SelectedItem && SelectedItem.title === "This week" && <BarChart range={SelectedItem} />}
      {SelectedItem && SelectedItem.title === "This month" && <LineChart range={SelectedItem} />}
      {RenderCustom && <LineChart range={SelectedItem} />}
    </>
  );
};

export default Dashboard;
