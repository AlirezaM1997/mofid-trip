import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Divider, Text, useTheme } from "@rneui/themed";
import { StyleSheet, View, ViewStyle } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import JalaliDatePicker from "@modules/jalali-date-picker";
import moment from "jalali-moment";
import { TourAddInputType } from "@src/gql/generated";

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

const DateTab = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [markedDays, setMarkedDays] = useState([]);
  const { values, errors, touched, setFieldTouched, setFieldValue, resetForm } =
    useFormikContext<TourAddInputType>();

  const setStartDate = date => {
    setFieldTouched("startTime", true);
    setFieldTouched("endTime", true);
    setFieldValue("startTime", date);
    setFieldValue("endTime", date);
    setMarkedDays([
      {
        date: date,
        buttonStyle: styles.startAndEndDayButtonStyle(theme),
        containerStyle: styles.startAndEndDayContainerStyle,
        titleStyle: styles.startAndEndDayTitleStyle(theme),
      },
    ]);
  };

  const handleDayPress = dayPressed => {
    const date = moment(dayPressed).format("YYYY-MM-DD");
    const dateStart = moment(values.startTime);
    if (markedDays.length === 0) {
      setStartDate(date);
      console.log(1)
    } else if (markedDays.length === 1 && moment(dateStart).isBefore(dayPressed)) {
      console.log(2)
      setFieldValue("endTime", date);
      const middleDays = getDaysBetween(moment(dateStart), moment(dayPressed));
      setMarkedDays([
        {
          date: dateStart,
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
  }

  const getFirstDayFormatted = () => {
    return markedDays.length
      ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
      : "";
  };

  const getLastDayFormatted = () => {
    if (markedDays.length) {
      return markedDays.length === 1 ?
        localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
        :
        localizeNumber(moment(markedDays.slice(-1)[0].date).format("jYYYY/jMM/jDD"))
    }
  };

  useEffect(() => {
    if (values.startTime && !values.endTime) {
      const dateStart = moment(values.startTime);
      setStartDate(dateStart);
    }
    else if (values.startTime && values.endTime) {
      const dateStart = moment(values.startTime);
      const dateEnd = moment(values.endTime);
      const middleDays = getDaysBetween(moment(dateStart), moment(dateEnd));
      setMarkedDays([{
        date: dateStart,
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
        date: dateEnd,
        buttonStyle: styles.endDayButtonStyle(theme),
        containerStyle: styles.endDayContainerStyle,
        titleStyle: styles.endDayTitleStyle(theme),
      },])
    }
  }, []);

  return (
    <>
      <JalaliDatePicker onDayPress={handleDayPress} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
          {touched.startTime && errors.startTime && (
            <Text type="error">{errors.startTime as string}</Text>
          )}
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("end")}: {getLastDayFormatted()}
          </Text>
          {touched.endTime && errors.endTime && (
            <Text type="error">{errors.endTime as string}</Text>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: { gap: 6 },
  container: { gap: 24 },
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 },
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
  startAndEndDayButtonStyle: (theme => ({
    backgroundColor: theme.colors.black,
  })) as ViewStyle,
  startAndEndDayContainerStyle: {
    width: 45,
  },
  startAndEndDayTitleStyle: (theme => ({
    color: theme.colors.white,
  })) as ViewStyle,
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nestedRow: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    gap: 10,
  },
  timeContainer: {
    display: "flex",
  },
});

export default DateTab;
