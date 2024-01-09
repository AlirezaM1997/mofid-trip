import moment from "jalali-moment";
import WhiteSpace from "@atoms/white-space";
import JalaliDatePicker from "@modules/jalali-date-picker";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Divider, Text, useTheme, CheckBox } from "@rneui/themed";
import { ProjectAddInputType } from "@src/gql/generated";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

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

const TabDate = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [checked, setChecked] = useState<boolean>(false);
  const { localizeNumber } = useLocalizedNumberFormat();
  const [markedDays, setMarkedDays] = useState([]);
  const { errors, touched, setFieldTouched, setFieldValue, resetForm, values } =
    useFormikContext<ProjectAddInputType>();

  const handleCheck = () => setChecked(!checked);

  const setStartDate = date => {
    setFieldTouched("dateStart", true);
    setFieldValue("dateStart", date);
    setMarkedDays([
      {
        date: date,
        buttonStyle: styles.startDayButtonStyle(theme),
        containerStyle: styles.startDayContainerStyle(theme),
        titleStyle: styles.startDayTitleStyle(theme),
      },
    ]);
  };

  const handleDayPress = dayPressed => {
    const date = moment(dayPressed).format("YYYY-MM-DD");
    const dateStart = moment(values.dateStart);
    if (checked) {
      setFieldTouched("dateStart", true);
      setFieldTouched("dateEnd", true);
      setFieldValue("dateStart", date);
      setFieldValue("dateEnd", date);
      setMarkedDays([
        {
          date: date,
          buttonStyle: styles.startAndEndDayButtonStyle(theme),
          containerStyle: styles.startAndEndDayContainerStyle(theme),
          titleStyle: styles.startAndEndDayTitleStyle(theme),
        },
      ]);
    } else {
      if (markedDays.length === 0) {
        setStartDate(date);
      } else if (markedDays.length === 1 && moment(dateStart).isBefore(dayPressed)) {
        setFieldTouched("dateEnd", true);
        setFieldValue("dateEnd", date);
        const startDay = markedDays[0].date;
        const middleDays = getDaysBetween(moment(startDay), moment(dayPressed));
        setMarkedDays([
          ...markedDays,
          ...middleDays.map(day => ({
            date: moment(day).format("YYYY-MM-DD"),
            buttonStyle: styles.middleDayButtonStyle(theme),
            containerStyle: styles.middleDayContainerStyle(theme),
            titleStyle: styles.middleDayTitleStyle(theme),
          })),
          {
            date: date,
            buttonStyle: styles.endDayButtonStyle(theme),
            containerStyle: styles.endDayContainerStyle(theme),
            titleStyle: styles.endDayTitleStyle(theme),
          },
        ]);
      } else {
        resetForm();
        setMarkedDays([]);
      }
    }
  };

  const getFirstDayFormatted = () => {
    return markedDays.length
      ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
      : "";
  };

  const getLastDayFormatted = () => {
    if (checked) {
      return markedDays.length
        ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
        : "";
    } else {
      return markedDays.length > 1
        ? localizeNumber(moment(markedDays.slice(-1)[0].date).format("jYYYY/jMM/jDD"))
        : "";
    }
  };

  useEffect(() => {
    if (checked && values.dateStart) {
      const dateStart = moment(values.dateStart);
      handleDayPress(dateStart);
    } else if (!checked && values.dateStart) {
      const dateStart = moment(values.dateStart);
      setStartDate(dateStart);
    }
  }, [checked]);

  return (
    <>
      <CheckBox checked={checked} onPress={handleCheck} title={tr("The host is one day")} />

      <JalaliDatePicker onDayPress={handleDayPress} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2 type={touched.dateStart && errors.dateStart ? "error" : "secondary"}>
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
          {touched.dateStart && errors.dateStart && (
            <Text type="error">{touched.dateStart && (errors.dateStart as string)}</Text>
          )}
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2 type={touched.dateEnd && errors.dateEnd ? "error" : "secondary"}>
            {tr("end")}: {getLastDayFormatted()}
          </Text>
          {touched.dateEnd && errors.dateEnd && (
            <Text type="error">{touched.dateEnd && (errors.dateEnd as string)}</Text>
          )}
        </View>
      </View>
      <WhiteSpace />
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
  startDayContainerStyle: (theme => ({
    width: 45,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  })) as ViewStyle,
  startDayTitleStyle: (theme => ({
    color: theme.colors.white,
  })) as ViewStyle,
  middleDayButtonStyle: (theme => ({
    backgroundColor: theme.colors.grey1,
    borderRadius: 0,
  })) as ViewStyle,
  middleDayContainerStyle: (theme => ({
    width: 45,
    borderRadius: 0,
  })) as ViewStyle,
  middleDayTitleStyle: (theme => ({
    color: theme.colors.grey5,
  })) as ViewStyle,
  endDayButtonStyle: (theme => ({
    backgroundColor: theme.colors.black,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  })) as ViewStyle,
  endDayContainerStyle: (theme => ({
    width: 45,
    borderRadius: 0,
  })) as ViewStyle,
  endDayTitleStyle: (theme => ({
    color: theme.colors.white,
  })) as ViewStyle,
  startAndEndDayButtonStyle: (theme => ({
    backgroundColor: theme.colors.black,
  })) as ViewStyle,
  startAndEndDayContainerStyle: (theme => ({
    width: 45,
  })) as ViewStyle,
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

export default TabDate;
