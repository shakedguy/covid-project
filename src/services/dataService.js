const today = new Date();
const [day, month, year] = [today.getDate(), today.getMonth(), today.getFullYear()];
const yesterday = day > 1 ? `${year}-${month + 1}-${day - 1}` : `${year}-${month}-${30}`;
const lastWeek = day > 7 ? `${year}-${month + 1}-${day - 7}` : `${year}-${month}-${30 - (7 - day)}`;

export const TimeRanges = [
  {
    title: "Yesterday",
    from: yesterday,
    to: `${year}-${month + 1}-${day}`,
  },
  {
    title: "This week",
    from: lastWeek,
    to: `${year}-${month + 1}-${day}`,
  },
  {
    title: "This month",
    from: `${year}-${month}-${day}`,
    to: `${year}-${month + 1}-${day}`,
  },
  {
    title: "Custom",
    from: "",
    to: "",
  },
];
