export default function getAllDaysInMonth(cursor: number) {
  const today = new Date() // Get the current date
  today.setMonth(today.getMonth() + cursor)

  const currentMonth = today.getMonth() // Get the current month (0-indexed)
  const currentYear = today.getFullYear() // Get the current year

  // Calculate the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // Initialize an array to store the days of the month
  const daysArray = []

  // Calculate the total number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Calculate the index of the first day of the month (0-indexed)
  const firstDayIndex = firstDayOfMonth.getDay() - 1

  // Fill in the days before the start of the month with null values
  for (let day = 0; day < firstDayIndex; day++) {
    daysArray.push({
      dayOfMonth: null,
      date: null,
    })
  }

  // Loop through each day of the month and create an object for it
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day)
    daysArray.push({
      dayOfMonth: day,
      date: date,
    })
  }

  return {
    yearWithMonth: today.toLocaleString("default", { month: "long", year: "numeric" }),
    daysArray,
  }
}
