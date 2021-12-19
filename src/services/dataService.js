import dayjs from "dayjs";
import { createRange } from "../services/helpers";

export const getTimeRanges = [
  {
    title: "Yesterday",
    dates: createRange(dayjs().subtract(1, "day"), dayjs()),
  },
  {
    title: "This week",
    dates: createRange(dayjs().subtract(7, "day"), dayjs()),
  },
  {
    title: "This month",
    dates: createRange(dayjs().subtract(30, "day"), dayjs()),
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

  range.title !== "Custom" && localStorage.setItem(range.title, JSON.stringify(result));
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

export const dateValidation = (date) => dayjs(date).isBefore(dayjs());
