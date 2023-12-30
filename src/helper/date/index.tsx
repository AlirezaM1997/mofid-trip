import moment from "jalali-moment";

export const diffDays = (start, end) => Math.ceil(Math.abs(start - end) / (1000 * 60 * 60 * 24));

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

export const calculateHoursSinceGivenDate = (givenDateString: string) => {
  // Convert the given date string to a Date object
  const givenDate = new Date(givenDateString);

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - givenDate;

  // Convert milliseconds to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  // Round the result to get whole hours
  const roundedHours = Math.round(hoursDifference);

  return roundedHours;
};

export const passedTime = date => {
  const jalaliDate = moment(date);

  const now = moment();
  const diffSeconds = now.diff(jalaliDate, "seconds");
  const diffMinutes = now.diff(jalaliDate, "minutes");
  const diffHours = now.diff(jalaliDate, "hours");
  const diffDays = now.diff(jalaliDate, "days");
  const diffWeeks = now.diff(jalaliDate, "weeks");
  const diffMonths = now.diff(jalaliDate, "months");
  const diffYears = now.diff(jalaliDate, "years");

  let relativeTimeString;

  if (diffSeconds < 60) relativeTimeString = `${diffSeconds}  ثانیه قبل`;
  else if (diffMinutes < 60) relativeTimeString = `${diffMinutes}  دقیقه قبل`;
  else if (diffHours < 24) relativeTimeString = `${diffHours}  ساعت قبل`;
  else if (diffDays < 7) relativeTimeString = `${diffDays}  روز قبل`;
  else if (diffWeeks < 4) relativeTimeString = `${diffWeeks}  هفته قبل`;
  else if (diffMonths < 12) relativeTimeString = `${diffMonths}  ماه قبل`;
  else relativeTimeString = `${diffYears} سال`;

  return relativeTimeString;
};
