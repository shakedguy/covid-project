import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { countries, colors, fetchData } from "../services/dataService";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PieChart = ({ range }) => {
  const [Options, setOptions] = useState(null);
  const [Datasets, setDatasets] = useState(null);
  const [Data, setData] = useState(null);

  useEffect(async () => {
    if (range) {
      const result = await fetchData(range.range, "deaths");
      setData(result);
    }
  }, [range]);

  useEffect(() => {
    if (Data) {
      console.log(Data);
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
      const options = {
        responsive: true,
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
  }, [Data]);

  return <Box sx={{ justifySelf: "center", justifyItems: "center", mx: 5, my: 2, p: 2 }}>{Datasets && Options && <Pie width={400} height={400} data={Datasets} options={Options} />}</Box>;
};

export default PieChart;
