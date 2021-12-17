import React, { useState } from "react";
import RangeCardsList from "./RangeCardsList";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart";
import { Box } from "@mui/material";
import DatePickers from "./DatePickers";

const Dashboard = () => {
  const [SelectedItem, setSelectedItem] = useState(null);
  const rangeSelectionHandler = (selectedItem) => {
    setSelectedItem(selectedItem);
  };
  return (
    <>
      <Box elevation={3} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        <RangeCardsList onRangeCardClick={rangeSelectionHandler} />
        <DatePickers range={SelectedItem} />
      </Box>
      {SelectedItem && SelectedItem.title === "Yesterday" && <BarChart />}
      {SelectedItem && SelectedItem.title === "This week" && <LineChart />}
    </>
  );
};

export default Dashboard;
