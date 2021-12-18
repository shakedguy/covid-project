import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import { countries, fetchData, colors, getDates } from "../services/dataService";
import faker from "faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = countries;

const BarChart = ({ range }) => {
  const [Options, setOptions] = useState(null);
  const [Datasets, setDatasets] = useState(null);
  const [Data, setData] = useState([]);

  useEffect(async () => {
    if (range) {
      const result = await fetchData(range.range, "deaths");
      setData(result);
      const d = Array.from(result);
      console.log(d);
    }
  }, [range]);

  useEffect(
    useCallback(async () => {
      const labels = await getDates(range.range);
      if (Data) {
        const dataset = {
          labels: labels,
          datasets: [
            {
              data: Data,
              backgroundColor: colors,
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        };
        const options = {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Mortality until ${range.title.toLowerCase()}`,
              position: "top",
              font: {
                size: 20,
                family: "sans-serif",
              },
            },
          },
        };
        setDatasets(dataset);
        setOptions(options);
      }
    }, [Data]),
    [Data]
  );

  return <Box sx={{ maxWidth: 800, maxHeight: 400, justifySelf: "center", justifyItems: "center", mx: 30 }}>{Datasets && <Bar data={Datasets} options={Options} />};</Box>;
};

export default BarChart;
