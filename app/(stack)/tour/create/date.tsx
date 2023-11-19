import { useState } from "react";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import TourCreateTab from "@modules/virtual-tabs";
import useTranslation from "@src/hooks/translation";
import { Calendar, DateData } from "react-native-calendars";
import { useCalendarTheme } from "@src/hooks/calendar-theme";
import { CheckBox, Divider, Text, useTheme } from "@rneui/themed";

const Screen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const calendarTheme = useCalendarTheme();
  const [checked, setChecked] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const [markedDates, setMarkedDates] = useState({
    startDate: "",
    endDate: "",
  });

  const handleDayPress = (day: DateData) => {
    if (markedDates.startDate) {
      setMarkedDates({ ...markedDates, endDate: day.dateString });
      return;
    }

    setMarkedDates({ ...markedDates, startDate: day.dateString });
  };

  const getMarked = () => {
    let marked = {};

    for (
      let i = +markedDates.startDate.split("-")[2];
      i <= +markedDates.endDate.split("-")[2];
      i++
    ) {
      marked[markedDates.startDate] = {
        disabled: true,
        startingDay: i == +markedDates.startDate.split("-")[2],
        endingDay: i == +markedDates.endDate.split("-")[2],
        color: theme.colors.black,
        textColor: theme.colors.white,
      };
      marked[markedDates.endDate] = {
        disabled: true,
        startingDay: i == +markedDates.startDate.split("-")[2],
        endingDay: i == +markedDates.endDate.split("-")[2],
        color: theme.colors.black,
        textColor: theme.colors.white,
      };
    }
    console.log("marked", markedDates.startDate.split("-")[2]);
    return marked;
  };

  return (
    <>
      <TourCreateTab index={4} />
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text heading2>{tr("tour date")}</Text>
          <Text caption type="grey2">
            {tr("choose a start and end date for the tour")}
          </Text>
        </View>

        <CheckBox
          title={tr("it is a one-day tour")}
          checked={checked}
          onPress={() => setChecked(!checked)}
        />

        <Calendar
          minDate={today}
          markingType="period"
          theme={calendarTheme}
          onDayPress={handleDayPress}
          renderArrow={direction =>
            direction === "left" ? <Text>{">"}</Text> : <Text>{"<"}</Text>
          }
          markedDates={getMarked()}
          // markedDates={{
          //   // "2023-11-21": { startingDay: true, color: "green" },
          //   // "2023-11-22": {
          //   //   color: "green",
          //   //   selected: true,
          //   //   endingDay: true,
          //   //   textColor: "gray",

          //   //   startingDay: true,
          //   //   customStyles: {
          //   //     container: {
          //   //       borderRadius: 8,
          //   //     },
          //   //   },
          //   // },
          //   // "2023-11-23": { color: "green", endingDay: true },
          //   [markedDates.startDate]: {
          //     startingDay: true,
          //     disableTouchEvent: true,
          //     color: theme.colors.black,
          //     customTextStyle: { color: theme.colors.white },
          //   },
          //   [markedDates.endDate]: {
          //     selected: true,
          //     endingDay: true,
          //     disableTouchEvent: true,
          //     color: theme.colors.black,

          //     customStyles: {
          //       container: {
          //         borderRadius: 8,
          //       },
          //     },
          //   },
          // }}
        />

        <View style={styles.showDateContainer}>
          <Text body2>{tr("beginning")}</Text>
          <Divider vertical={true} style={styles.divider} />
          <Text body2>{tr("end")}</Text>
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  header: { gap: 6 },
  container: { gap: 24 },
  divider: { width: 50 },
  showDateContainer: { flexDirection: "row", justifyContent: "space-between" },
});

export default Screen;
