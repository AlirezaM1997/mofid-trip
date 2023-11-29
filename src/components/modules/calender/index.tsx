import moment from "jalali-moment";
import { CheckBox, Text, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Calendar, DateData } from "react-native-calendars";
import { useCalendarTheme } from "@src/hooks/calendar-theme";
import useTranslation from "@src/hooks/translation";
import { MarkedDates } from "react-native-calendars/src/types";

type PropsType = {
  markedDates: MarkedDates;
  setMarkedDates: (t: MarkedDates) => void;
};

const CustomCalender = ({ markedDates, setMarkedDates }: PropsType) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const calendarTheme = useCalendarTheme();
  const { setFieldValue } = useFormikContext();
  const [checked, setChecked] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const [startingDay, setStartingDay] = useState(false);

  const handleDayPress = (day: DateData) => {
    if (checked) {
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: theme.colors.black,
          textColor: theme.colors.white,
        },
      });
      setFieldValue("startDate", day.dateString);
      return;
    }

    if (startingDay) {
      let periodDates = {};
      const startingDayDate = new Date(Object.keys(markedDates)[0]);
      const periodLength = (+new Date(day.dateString) - +startingDayDate) / 86400000 - 1;
      const endingDayDate = Object.values(markedDates)[Object.keys(markedDates).length - 1];

      if (new Date(day.dateString) <= startingDayDate || endingDayDate?.endingDay) {
        setMarkedDates({
          [day.dateString]: {
            startingDay: true,
            color: theme.colors.black,
            textColor: theme.colors.white,
          },
        });
        setFieldValue("startDate", day.dateString);
        return;
      }

      for (let i = 1; i <= periodLength; i++) {
        let nextDay = new Date(startingDayDate).setDate(startingDayDate.getDate() + i);

        periodDates = {
          ...periodDates,
          [moment(nextDay).format("YYYY-MM-DD")]: {
            color: theme.colors.black,
            textColor: theme.colors.white,
          },
        };
      }

      setMarkedDates({
        ...markedDates,
        ...periodDates,
        [day.dateString]: {
          endingDay: true,
          color: theme.colors.black,
          textColor: theme.colors.white,
        },
      });
      setFieldValue("endDate", day.dateString);
      return;
    }

    setMarkedDates({
      [day.dateString]: {
        startingDay: true,
        color: theme.colors.black,
        textColor: theme.colors.white,
      },
    });
    setFieldValue("startDate", day.dateString);
    setStartingDay(true);
  };

  useEffect(() => {
    if (checked) {
      setMarkedDates({
        [Object.keys(markedDates)[Object.keys(markedDates).length - 1]]: {
          startingDay: true,
          color: theme.colors.black,
          textColor: theme.colors.white,
        },
      });
      return;
    }
  }, [checked]);

  return (
    <>
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
        renderArrow={direction => (direction === "left" ? <Text>{">"}</Text> : <Text>{"<"}</Text>)}
        markedDates={{
          ...markedDates,
          // [today]: {
          //   customStyles: {
          //     container: { borderWidth: 1 },
          //   },
          // },
        }}
      />
    </>
  );
};

export default CustomCalender;
