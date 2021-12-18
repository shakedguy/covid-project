import React, { useState, useEffect } from "react";
import RangeCardsList from "./RangeCardsList";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart";
import { Box } from "@mui/material";
import DatePickers from "./DatePickers";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [SelectedItem, setSelectedItem] = useState(null);
  const [Data, setData] = useState(null);
  const rangeSelectionHandler = async (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <Box elevation={3} sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
        <RangeCardsList onRangeCardClick={rangeSelectionHandler} />
        {SelectedItem && SelectedItem.title === "Custom" && <DatePickers range={SelectedItem} />}
      </Box>
      {SelectedItem && SelectedItem.title === "Yesterday" && <PieChart range={SelectedItem} />}
      {SelectedItem && SelectedItem.title === "This week" && <BarChart range={SelectedItem} />}
      {/* {SelectedItem && SelectedItem.title === "This week" && <LineChart />} */}
    </>
  );
};

export default Dashboard;
