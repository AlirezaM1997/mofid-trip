const period = (startDate: Date | string, endDate: Date | string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());

  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
export default period;
