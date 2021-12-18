import dayjs, { Dayjs } from "dayjs";

const today = new dayjs();
const yesterday = [today.subtract(1, "day")];
const lastWeek = [];
const lastMonth = [];
for (let i = 30; i >= 1; --i) {
  lastMonth.push(today.subtract(i, "day"));
  i <= 7 && lastWeek.push(today.subtract(i, "day"));
}

export const TimeRanges = [
  {
    title: "Yesterday",
    range: yesterday,
  },
  {
    title: "This week",
    range: lastWeek,
  },
  {
    title: "This month",
    range: lastMonth,
  },
  {
    title: "Custom",
    range: null,
  },
];

export const countries = ["israel", "united-states", "germany", "france", "china", "india", "brazil"];

export const colors = ["rgba(53, 162, 235, 0.5", "rgba(215, 0, 64, 0.5)", "rgba(1, 1, 1, 0.5)", "rgba(128, 0, 128,0.5)", "rgba(255, 99, 132, 0.5)", "rgba(8, 143, 143, 0.5)", "rgba(255, 191, 0, 0.5)"];

export const fetchData = async (range, status = "") => {
  let fetchedData = new Array(countries.length);
  const statusPath = status === "" ? "" : `/status/${status}`;
  countries.map(async (country, index) => {
    const api = `https://api.covid19api.com/total/country/${country}${statusPath}?from=${range[0].format("YYYY-MM-DD")}T00:00:00Z&to=${range[range.length - 1].format("YYYY-MM-DD")}T23:59:59Z`;
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const data = await response.json();
      const a = await data.map((date) => parseInt(date.Cases));
      fetchedData[index] = a;
    } catch (error) {
      alert(error.message);
    }
  });

  return fetchedData;
};

export const getDates = (range) => {
  return range.map((date) => date.format("DD/MM/YYYY"));
};
