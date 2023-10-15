const dateConverter = (inputDate: Date) => {
  const dateString = inputDate;
  const date = new Date(dateString);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  const formattedDate = `${month} ${day}`;

  return formattedDate;
};
export default dateConverter