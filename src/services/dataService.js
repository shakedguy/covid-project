import dayjs from "dayjs";

const today = new dayjs();
const yesterday = [today.subtract(1, "day")];
const lastWeek = [];
const lastMonth = [];
for (let i = 30; i >= 1; --i) {
  lastMonth.push(today.subtract(i, "day"));
  i <= 7 && lastWeek.push(today.subtract(i, "day"));
}

export const createRange = (from, to) => {};

export const TimeRanges = [
  {
    title: "Yesterday",
    dates: yesterday,
  },
  {
    title: "This week",
    dates: lastWeek,
  },
  {
    title: "This month",
    dates: lastMonth,
  },
  {
    title: "Custom",
    dates: null,
  },
];

export const countries = ["israel", "united-states", "germany", "france", "china", "india", "brazil"];

export const colors = ["rgba(53, 162, 235, 0.5", "rgba(215, 0, 64, 0.5)", "rgba(1, 1, 1, 0.5)", "rgba(128, 0, 128,0.5)", "rgba(255, 99, 132, 0.5)", "rgba(8, 143, 143, 0.5)", "rgba(255, 191, 0, 0.5)"];

export const getData = async (range, status = "") => {
  let result = localStorage.getItem(range.title);

  if (result) return JSON.parse(result);
  result = [];
  const statusPath = status === "" ? "" : `/status/${status}`;
  for (const country of countries) {
    const api = `https://api.covid19api.com/total/country/${country}${statusPath}?from=${range.dates[0].format("YYYY-MM-DD")}T00:00:00Z&to=${range.dates[range.dates.length - 1].format(
      "YYYY-MM-DD"
    )}T23:59:59Z`;
    try {
      const countryData = await fetchData(api);
      if (!countryData) throw new Error("Fetch failed");
      result.push(countryData);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  localStorage.setItem(range.title, JSON.stringify(result));
  return result;
};

const fetchData = async (api) => {
  try {
    const response = await fetch(api);
    if (!response.ok) throw new Error(response.text);
    const textResult = await response.text();
    const result = JSON.parse(textResult);
    return result.map((date) => date.Cases);
  } catch (error) {
    console.log(error.message);
    return fetchData(api);
  }
};

export const getDates = (range) => range.map((date) => date.format("DD/MM"));

export const setChartOptions = (title) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "dataset",
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        position: "top",
        font: {
          size: 20,
          family: "sans-serif",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 2,
        top: 2,
        bottom: 2,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10000,
        },
      },
      y1: {
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
};

export const dateValidation = (date) => dayjs(date).isBefore(dayjs());
