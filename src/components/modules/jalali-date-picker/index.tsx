import Header from "./header";
import { styles } from "./styles";
import WeekDays from "./week-days";
import Day, { DayProps } from "./day";
import getAllDaysInMonth from "./helper";
import { CalendarContext } from "./context";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import moment, { Moment } from "jalali-moment";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

type DaysDataType = { date: string; data: number | string }[];

type JalaliDatePickerProps = {
  markedDays?: DayProps[];
  daysData?: DaysDataType;
  disablePassedDates?: boolean;
  disableDaysAfter?: moment.Moment; // gregorian based
  disableDaysBefore?: moment.Moment; // gregorian based
  disableDaysIn?: moment.Moment[]; // gregorian based
  onDayPress?: ({ dayPressed }) => void;
};

const JalaliDatePicker = ({
  daysData,
  onDayPress,
  markedDays,
  disablePassedDates = false,
  ...props
}: JalaliDatePickerProps) => {
  const defaultCursor = daysData
    ? (+moment(daysData?.[0].date).locale("fa").format("YYYY") -
        +moment(new Date()).locale("fa").format("YYYY")) *
        12 +
      +moment(daysData?.[0].date).locale("fa").format("M") -
      +moment(new Date()).locale("fa").format("M")
    : 0;
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [cursor, setCursor] = useState<number>(defaultCursor);
  const [yearCursor, setYearCursor] = useState<number>(0);
  const { daysArray } = getAllDaysInMonth(cursor);
  const { localizeNumber } = useLocalizedNumberFormat();

  function findMarkedDay(date: moment.Moment) {
    for (let i = 0; i < (markedDays as [])?.length; i++) {
      if (moment(markedDays?.[i].date, "YYYY-MM-DD").isSame(date)) {
        return markedDays?.[i]; // Return the object if found
      }
    }
    return null; // Return null if the object is not found
  }

  function findDayData(date: moment.Moment) {
    for (let i = 0; i < (daysData as [])?.length; i++) {
      if (moment(daysData?.[i]?.date, "YYYY-MM-DD").isSame(date)) {
        return daysData?.[i]; // Return the object if found
      }
    }
    return null; // Return null if the object is not found
  }

  function shouldDisable(date: moment.Moment) {
    return (
      props.disableDaysAfter?.isBefore(date) ||
      props.disableDaysBefore?.isAfter(date) ||
      props.disableDaysIn?.find(disableDate => moment(disableDate).isSame(date))
    );
  }

  const _onDayPress = (date: any) => {
    onDayPress?.(date);
  };

  useEffect(() => {
    if (markedDays?.length !== 0 && cursor === 0) {
      let a =
        (+moment(markedDays?.[0]?.date).locale("fa").format("YYYY") -
          +moment(new Date()).locale("fa").format("YYYY")) *
          12 +
        (+moment(markedDays?.[0]?.date).locale("fa").format("M") -
          +moment(new Date()).locale("fa").format("M"));
      setCursor(a);
    }
  }, [markedDays?.[0]?.date]);

  return (
    <CalendarContext.Provider
      value={{
        cursor: cursor,
        setCursor: setCursor,
        yearCursor: yearCursor,
        setYearCursor: setYearCursor,
      }}>
      <View style={styles.root}>
        <Header />
        <WeekDays />
        <View style={styles.divider(theme)} />
        <FlatList
          contentContainerStyle={[
            styles.contentContainerStyle,
            styles.calendarContentContainerStyle,
          ]}
          numColumns={7}
          horizontal={false}
          data={daysArray}
          columnWrapperStyle={{ gap: 2 }}
          renderItem={({ index, item }) => {
            const markedDay = markedDays && markedDays.length && findMarkedDay(item.date as Moment);
            const matchedDays = daysData && daysData.length && findDayData(item.date as Moment);

            const validMarkedDay = markedDay as DayProps;
            const validMatchDays = matchedDays as DaysDataType[number];

            const dayData = validMatchDays?.data;

            const isExpiredDate =
              disablePassedDates && moment(item.date).isBefore(new Date(), "day");

            return (
              <View style={styles.container}>
                <Day
                  key={index}
                  date={item.date}
                  onPress={e => _onDayPress(item.date)}
                  disabled={
                    (shouldDisable(item.date as Moment) as boolean) ||
                    (daysData && !dayData) ||
                    isExpiredDate
                  }
                  ViewComponent={() =>
                    item.date && (
                      <View style={[validMarkedDay?.buttonStyle, styles.viewComponent]}>
                        <Text
                          style={[
                            styles.dayText,
                            validMarkedDay?.titleStyle,
                            (daysData && !dayData) || isExpiredDate ? styles.disabledDay : {},
                          ]}>
                          {localizeNumber(moment(item.date).locale("fa").format("D"))}
                        </Text>
                        {dayData && (
                          <Text style={[validMarkedDay?.titleStyle, styles.dayText]} error>
                            {`${localizeNumber(dayData.toString() as string)} ${tr("man")}`}
                          </Text>
                        )}
                      </View>
                    )
                  }
                  {...markedDay}
                />
              </View>
            );
          }}
          keyExtractor={i => i.dayOfMonth ?? Math.random()}
        />
      </View>
    </CalendarContext.Provider>
  );
};

export default JalaliDatePicker;
