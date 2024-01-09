import { FlatList, View } from "react-native";
import { useState } from "react";
import { useTheme } from "@rneui/themed";
import getAllDaysInMonth from "./helper";
import { styles } from "./styles";
import WeekDays from "./week-days";
import Day, { DayProps } from "./day";
import Header from "./header";
import { CalendarContext } from "./context";
import moment from "jalali-moment";

type JalaliDatePickerProps = {
  onDayPress?: ({ dayPressed }) => void;
  markedDays?: DayProps[];
  disableDaysAfter?: moment.Moment; // gregorian based
  disableDaysBefore?: moment.Moment; // gregorian based
  disableDaysIn?: moment.Moment[]; // gregorian based
};

const JalaliDatePicker = ({ onDayPress, markedDays, ...props }: JalaliDatePickerProps) => {
  const { theme } = useTheme();
  const [cursor, setCursor] = useState(0);
  const { daysArray } = getAllDaysInMonth(cursor);

  function findMarkedDay(date: moment.Moment) {
    for (let i = 0; i < markedDays.length; i++) {
      if (moment(markedDays[i].date, "YYYY-MM-DD").isSame(date)) {
        return markedDays[i]; // Return the object if found
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

  const _onDayPress = date => {
    onDayPress?.(date);
  };

  return (
    <CalendarContext.Provider value={{ cursor: cursor, setCursor: setCursor }}>
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
            const markedDay = markedDays && markedDays.length && findMarkedDay(item.date);
            return (
              <Day
                key={index}
                date={item.date}
                onPress={e => _onDayPress(item.date)}
                disabled={shouldDisable(item.date)}
                {...markedDay}
              />
            );
          }}
          keyExtractor={i => i.dayOfMonth ?? Math.random()}
        />
      </View>
    </CalendarContext.Provider>
  );
};

export default JalaliDatePicker;
