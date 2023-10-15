export const diffDays = (start, end) =>
  Math.ceil(Math.abs(start - end) / (1000 * 60 * 60 * 24));

export const period = (startDate: Date | string, endDate: Date | string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());

  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const dateConverter = (inputDate: Date) => {
  const dateString = inputDate;
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  const formattedDate = `${month} ${day}`;

  return formattedDate;
};
