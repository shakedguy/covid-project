import dayjs from "dayjs";

export const getDates = (range) => range.map((date) => dayjs(date).format("DD/MM"));

export const createRange = (from, to) => {
  const result = [];
  let iter = dayjs(from);
  while (iter.format("YYYY-MM-DD") !== dayjs(to).format("YYYY-MM-DD")) {
    result.push(iter);
    iter = iter.add(1, "day");
  }
  return result;
};

export const datesFormatting = (...dates) => dates.map((date) => dayjs(date).format("YYYY-MM-DD"));

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
  };
};
