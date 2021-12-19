import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { countries, colors, getData } from "../services/dataService";
import { setChartOptions } from "../services/helpers";
import { Box } from "@mui/material";
import Loader from "./Loader";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ range }) => {
  const [Options, setOptions] = useState(null);
  const [Datasets, setDatasets] = useState(null);
  const [Data, setData] = useState(null);

  useEffect(async () => {
    if (range) {
      const result = await getData(range, "deaths");
      setData(result);
    }
  }, [range]);

  useEffect(() => {
    if (Data) {
      const dataset = {
        labels: countries,
        datasets: [
          {
            data: Data,
            backgroundColor: colors,
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };
      const options = setChartOptions(`Mortality until ${range.title.toLowerCase()}`);

      setDatasets(dataset);
      setOptions(options);
    }
  }, [Data]);
  const isLoading = !Datasets || !Options;

  return (
    <Box sx={{ justifySelf: "center", justifyItems: "center", mx: 5, my: 2, p: 2 }}>
      {isLoading && <Loader />}
      {!isLoading && <Pie width={400} height={400} data={Datasets} options={Options} />}
    </Box>
  );
};

export default PieChart;
