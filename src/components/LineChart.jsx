import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import { countries, getData, colors, getDates, setChartOptions, reduceData } from "../services/dataService";
import Loader from "./Loader";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ range }) => {
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
        borderColor: colors[index],
        borderWidth: 2,
        borderJoinStyle: "bevel",
        borderCapStyle: "square",
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
      {!isLoading && <Line data={Datasets} options={Options} />}
    </Box>
  );
};

export default LineChart;
