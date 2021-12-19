import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import { countries, getData, colors } from "../services/dataService";
import { setChartOptions } from "../services/helpers";

import { getDates } from "../services/helpers";
import Loader from "./Loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = countries;

const BarChart = ({ range }) => {
  const [Options, setOptions] = useState(null);
  const [Datasets, setDatasets] = useState(null);
  const [Data, setData] = useState(null);
  const labels = getDates(range.dates);

  useEffect(async () => {
    if (range && !Data) {
      try {
        const response = await getData(range, "deaths");
        setData(response);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [range]);

  const createDatasets = () => {
    const datasets = Data.map((countryData, index) => {
      return {
        label: countries[index],
        data: countryData,
        backgroundColor: colors[index],
        borderColor: "black",
        borderWidth: 1,
        barThickness: 22,
        borderRadius: 3,
        minBarLength: 5,
        borderSkipped: "bottom",
      };
    });
    return datasets;
  };

  useEffect(() => {
    if (Data) {
      const datasets = createDatasets();
      const data = {
        labels: labels,
        datasets: datasets,
      };
      const options = setChartOptions(`Mortality during ${range.title.toLowerCase()}`);
      setDatasets(data);
      setOptions(options);
    }
  }, [Data]);

  const isLoading = !Datasets || !Options;

  return (
    <Box sx={{ width: "90%", height: 520, mx: 7, justifySelf: "center", justifyItems: "center" }}>
      {isLoading && <Loader />}
      {!isLoading && <Bar data={Datasets} options={Options} />}
    </Box>
  );
};

export default BarChart;
