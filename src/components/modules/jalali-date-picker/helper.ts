import moment from "jalali-moment";

export default function getAllDaysInMonth(cursor: number) {
  let today = moment(); // Get the current date
  today = today.clone().add(cursor, "jMonth");
  const currentMonth = today.jMonth() + 1; // Get the current month (0-indexed)
  const currentYear = today.jYear(); // Get the current year

  // Calculate the first day of the month
  const firstDayOfMonth = today.clone().startOf("jMonth");

  // Initialize an array to store the days of the month
  const daysArray = [];

  // Calculate the total number of days in the current month
  const daysInMonth = firstDayOfMonth.jDaysInMonth();

  // Calculate the index of the first day of the month (0-indexed)
  const firstDayIndex = firstDayOfMonth.jDay();

  // Fill in the days before the start of the month with null values
  for (let day = 0; day < firstDayIndex; day++) {
    daysArray.push({
      dayOfMonth: null,
      date: null,
    });
  }

  // Loop through each day of the month and create an object for it
  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment(`${currentYear}-${currentMonth}-${day}`, "jYYYY-jM-jD");
    daysArray.push({
      dayOfMonth: day,
      date: date,
    });
  }

  return {
    yearWithMonth: today.locale("fa").format("jMMMM jYYYY"),
    daysArray,
    firstDayOfMonth,
  };
}
