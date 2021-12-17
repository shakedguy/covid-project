import React, { useState } from "react";
import RangesCards from "./RangesCards";

const Dashboard = () => {
  const [SelectedItem, setSelectedItem] = useState(null);
  const rangeSelectionHandler = (selectedItem) => {
    setSelectedItem(selectedItem);
  };
  return <RangesCards onRangeCardClick={rangeSelectionHandler} />;
};

export default Dashboard;
