import { useTheme } from "@rneui/themed";

export const useCalendarTheme = () => {
  const { theme } = useTheme();

  return {
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#b6c1cd",
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: "#ffffff",
    todayTextColor: theme.colors.primary,
    dayTextColor: theme.colors.black,
    textDisabledColor: theme.colors.grey2,
    arrowColor: theme.colors.primary,
  };
};
