import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { storeNewItem } from "../services/dataService";
import { createRange } from "../services/helpers";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RangeCardsList from "../components/RangeCardsList";
import DatePickers from "../components/DatePickers";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart";

const Dashboard = () => {
  const [SelectedItem, setSelectedItem] = useState(null);
  const [IsDatePicked, setIsDatePicked] = useState(false);
  const [CustomRange, setCustomRange] = useState(null);
  const [RenderCustom, setRenderCustom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedItem = sessionStorage.getItem("selected-item");
    if (savedItem) {
      const savedObject = JSON.parse(savedItem);
      rangeSelectionHandler(savedObject);
    }
  });
  const rangeSelectionHandler = (selectedItem) => {
    setIsDatePicked(false);
    setRenderCustom(false);
    setSelectedItem(selectedItem);
    storeNewItem(selectedItem);
    navigate(selectedItem.title.toLowerCase().replace(" ", "-"));
  };

  const pickedDatesHandler = (start, end) => {
    setRenderCustom(false);
    setIsDatePicked(true);
    setCustomRange(createRange(start, end));
  };

  const fetchButtonHandler = () => {
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
          <Button variant="contained" sx={{ maxWidth: 120 }} startIcon={<DownloadIcon />} onClick={fetchButtonHandler}>
            Fetch
          </Button>
        </Box>
      )}
      <Routes>
        <Route path="yesterday" element={SelectedItem && SelectedItem.title === "Yesterday" && <PieChart range={SelectedItem} />} />
        <Route path="this-week" element={SelectedItem && SelectedItem.title === "This week" && <BarChart range={SelectedItem} />} />
        <Route path="this-month" element={SelectedItem && SelectedItem.title === "This month" && <LineChart range={SelectedItem} />} />
        <Route path="custom" element={RenderCustom && <LineChart range={SelectedItem} />} />
      </Routes>
    </>
  );
};

export default Dashboard;
