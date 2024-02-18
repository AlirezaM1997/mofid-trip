const useGetDaysBetween = () => {
    const getDaysBetween = (startDay, endDay) => {
        // Array to store the days
        var betweenDays = [];
        // Clone the start date to avoid modifying the original
        var currentDate = startDay.clone().add(1, "day"); // Start from the day after the start date
        // Loop through the dates until the day before the end date
        while (currentDate.isBefore(endDay, "day")) {
            // Add the current date to the array
            betweenDays.push(currentDate.format("YYYY-MM-DD"));
            // Move to the next day
            currentDate.add(1, "day");
        }
        // Display the array of days between the start and end dates
        return betweenDays;
    };
    return { getDaysBetween }
};
export default useGetDaysBetween;