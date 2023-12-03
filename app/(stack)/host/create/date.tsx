import Container from "@atoms/container";
import BottomButtonLayout from "@components/layout/bottom-button";
import JalaliDatePicker from "@modules/jalali-date-picker";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { Button, Divider, Text, useTheme, CheckBox } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router } from "expo-router";
import { Formik } from "formik";
import moment from "jalali-moment";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

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

const HostCreateDateScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const formikInnerRef = useRef();
  const [checked, setChecked] = useState<boolean>(false);
  const { localizeNumber } = useLocalizedNumberFormat();
  const [markedDays, setMarkedDays] = useState([]);
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);
  const initialValues = { dateStart: data.dateStart, dateEnd: data.dateEnd };
  const validationSchema = Yup.object().shape({
    dateStart: Yup.date().required(tr("Required")),
    dateEnd: Yup.date().required(tr("Required")),
  });

  const handleSubmit = values => {
    dispatch(
      setHostCreateData({
        ...data,
        ...values,
      })
    );
    router.push({
      pathname: "host/create/price",
      params: {
        x: -200 * 5,
      },
    });
  };

  const handleCheck = () => setChecked(!checked);

  const handleDayPress = dayPressed => {
    const form = formikInnerRef.current;
    const date = moment(dayPressed).format("YYYY-MM-DD");
    if (checked) {
      form.setFieldTouched("dateStart", true);
      form.setFieldTouched("dateEnd", true);
      form.setFieldValue("dateStart", date);
      form.setFieldValue("dateEnd", date);
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
        form.setFieldTouched("dateStart", true);
        form.setFieldValue("dateStart", date);
        setMarkedDays([
          {
            date: date,
            buttonStyle: styles.startDayButtonStyle(theme),
            containerStyle: styles.startDayContainerStyle(theme),
            titleStyle: styles.startDayTitleStyle(theme),
          },
        ]);
      } else if (markedDays.length === 1) {
        form.setFieldTouched("dateEnd", true);
        form.setFieldValue("dateEnd", date);
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
        form.resetForm();
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

  return (
    <Formik
      innerRef={formikInnerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, touched, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={handleSubmit}>{tr("Next")}</Button>,
            <Button type="outline" color="secondary" onPress={() => router.back()}>
              {tr("back")}
            </Button>,
          ]}>
          <HostCreateTabs index={4} />

          <Container>
            <CheckBox checked={checked} onPress={handleCheck} title={tr("The host is one day")} />
          </Container>

          <JalaliDatePicker onDayPress={handleDayPress} markedDays={markedDays} />

          <Container>
            <View style={styles.showDateContainer}>
              <View style={styles.timeContainer}>
                <Text body2 type={touched.dateStart && errors.dateStart ? "error" : "secondary"}>
                  {tr("beginning")}: {getFirstDayFormatted()}
                </Text>
                {touched.dateStart && errors.dateStart && (
                  <Text type="error">{touched.dateStart && (errors.dateStart as string)}</Text>
                )}
              </View>
              <Divider vertical={true} style={styles.divider} />
              <View style={styles.timeContainer}>
                <Text body2 type={touched.dateEnd && errors.dateEnd ? "error" : "secondary"}>
                  {tr("end")}: {getLastDayFormatted()}
                </Text>
                {touched.dateEnd && errors.dateEnd && (
                  <Text type="error">{touched.dateEnd && (errors.dateEnd as string)}</Text>
                )}
              </View>
            </View>
          </Container>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  header: { gap: 6 },
  container: { gap: 24 },
  divider: { width: 50 },
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 },
  startDayButtonStyle: theme => ({
    backgroundColor: theme.colors.black,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }),
  startDayContainerStyle: theme => ({
    width: 45,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }),
  startDayTitleStyle: theme => ({
    color: theme.colors.white,
  }),
  middleDayButtonStyle: theme => ({
    backgroundColor: theme.colors.grey1,
    borderRadius: 0,
  }),
  middleDayContainerStyle: theme => ({
    width: 45,
    borderRadius: 0,
  }),
  middleDayTitleStyle: theme => ({
    color: theme.colors.grey5,
  }),
  endDayButtonStyle: theme => ({
    backgroundColor: theme.colors.black,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  endDayContainerStyle: theme => ({
    width: 45,
    borderRadius: 0,
  }),
  endDayTitleStyle: theme => ({
    color: theme.colors.white,
  }),
  startAndEndDayButtonStyle: theme => ({
    backgroundColor: theme.colors.black,
  }),
  startAndEndDayContainerStyle: theme => ({
    width: 45,
  }),
  startAndEndDayTitleStyle: theme => ({
    color: theme.colors.white,
  }),
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

export default HostCreateDateScreen;
