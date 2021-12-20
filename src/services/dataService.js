import dayjs from "dayjs";
import { createRange, datesFormatting } from "../services/helpers";

export const timeRanges = [
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
  // datesFormatting(range.dates[0], range.dates[1], range.dates[2]);

  let result = sessionStorage.getItem(range.title);

  if (result) return JSON.parse(result);
  result = [];
  const [from, to] = datesFormatting(range.dates[0], range.dates[range.dates.length - 1]);
  const statusPath = status === "" ? "" : `/status/${status}`;
  for (const country of countries) {
    const api = `https://api.covid19api.com/total/country/${country}${statusPath}?from=${from}T00:00:00Z&to=${to}T23:59:59Z`;
    try {
      const countryData = await fetchData(api);
      if (!countryData) throw new Error("Fetch failed");
      result.push(countryData);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }

  range.title !== "Custom" && sessionStorage.setItem(range.title, JSON.stringify(result));
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

export const cleanSessionStorage = () => timeRanges.forEach((range) => sessionStorage.removeItem(range.title));

export const storeNewItem = (item) => sessionStorage.setItem("selected-item", JSON.stringify(item));
