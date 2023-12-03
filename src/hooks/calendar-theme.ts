import { useTheme } from "@rneui/themed";

export const useCalendarTheme = () => {
  const { theme } = useTheme();

  return {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: theme.colors.secondary,
    selectedDayTextColor: "#ffffff",
    todayTextColor: theme.colors.secondary,
    dayTextColor: theme.colors.black,
    textDisabledColor: theme.colors.grey2,
    arrowColor: theme.colors.secondary,
  };
};
