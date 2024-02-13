import { useTheme } from "@rneui/themed";
import { useFormikContext } from "formik";
import moment from "jalali-moment";
import uesSetStartDate from "./set-start-date";
import useGetDaysBetween from "../get-days-between";
import { StyleSheet, ViewStyle } from "react-native";

const useHandleDayPress = () => {
  const { theme } = useTheme();

  const { values, setFieldValue, resetForm } = useFormikContext();

  const { setStartDate } = uesSetStartDate();
  const { getDaysBetween } = useGetDaysBetween();

  const handleDayPress = (dayPressed, markedDays, setMarkedDays, dateStart, dateEnd) => {
    const date = moment(dayPressed).format("YYYY-MM-DD");
    const startDate = moment(values[dateStart]);
    if (markedDays.length === 0) {
      setStartDate(date, setMarkedDays, dateStart, dateEnd);
    } else if (markedDays.length === 1 && moment(startDate).isBefore(dayPressed)) {
      setFieldValue(dateEnd, date);
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
      resetForm();
      setMarkedDays([]);
    }
  };
  const styles = StyleSheet.create({
    startDayButtonStyle: (theme => ({
      backgroundColor: theme.colors.black,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
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
      backgroundColor: theme.colors.black,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    })) as ViewStyle,
    endDayContainerStyle: {
      width: 45,
      borderRadius: 0,
    },
    endDayTitleStyle: (theme => ({
      color: theme.colors.white,
    })) as ViewStyle,
  });
  return { handleDayPress };
};
export default useHandleDayPress;
