import { useTheme } from "@rneui/themed";
import moment from "jalali-moment";
import useGetDaysBetween from "../get-days-between";
import { StyleSheet, ViewStyle } from "react-native";
import uesSetStartDateWithState from "./set-start-date-with-state";

const useHandleDayPressWithState = () => {
  const { theme } = useTheme();

  const { setStartDateWithState } = uesSetStartDateWithState();
  const { getDaysBetween } = useGetDaysBetween();

  const handleDayPressWithState = (
    dayPressed,
    markedDays,
    setMarkedDays,
    setDateRange,
    dateRange
  ) => {
    const date = moment(dayPressed).format("YYYY-MM-DD");
    const startDate = moment(dateRange.dateStart);
    if (markedDays.length === 0) {
      setStartDateWithState(date, setMarkedDays, setDateRange);
    } else if (markedDays.length === 1 && moment(startDate).isBefore(dayPressed)) {
      setDateRange({ ...dateRange, dateEnd: date });
      const middleDays = getDaysBetween(moment(startDate), moment(dayPressed));
      setMarkedDays([
        {
          date: startDate,
          buttonStyle: styles.startDayButtonStyle(theme),
          containerStyle: styles.startDayContainerStyle,
          titleStyle: styles.startDayTitleStyle(theme),
        },
        ...middleDays.map(day => ({
          date: moment(day).format("YYYY-MM-DD"),
          buttonStyle: styles.middleDayButtonStyle(theme),
          containerStyle: styles.middleDayContainerStyle,
          titleStyle: styles.middleDayTitleStyle(theme),
        })),
        {
          date: date,
          buttonStyle: styles.endDayButtonStyle(theme),
          containerStyle: styles.endDayContainerStyle,
          titleStyle: styles.endDayTitleStyle(theme),
        },
      ]);
    } else {
      setDateRange({ dateStart: "", dateEnd: "" });
      setMarkedDays([]);
    }
  };
  const styles = StyleSheet.create({
    startDayButtonStyle: (theme => ({
      backgroundColor: theme.colors.black,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    })) as ViewStyle,
    startDayContainerStyle: {
      width: 45,
      borderRadius: 0,
    },
    startDayTitleStyle: (theme => ({
      color: theme.colors.white,
    })) as ViewStyle,
    middleDayButtonStyle: (theme => ({
      backgroundColor: theme.colors.grey1,
      borderRadius: 0,
    })) as ViewStyle,
    middleDayContainerStyle: {
      width: 45,
      borderRadius: 0,
    },
    middleDayTitleStyle: (theme => ({
      color: theme.colors.grey5,
    })) as ViewStyle,
    endDayButtonStyle: (theme => ({
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: theme.colors.black,
    })) as ViewStyle,
    endDayContainerStyle: {
      width: 45,
      borderRadius: 0,
    },
    endDayTitleStyle: (theme => ({
      color: theme.colors.white,
    })) as ViewStyle,
  });
  return { handleDayPressWithState };
};
export default useHandleDayPressWithState;
