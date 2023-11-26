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
  onDayPress: ({ dayPressed }) => void;
  markedDays: DayProps[];
};

const JalaliDatePicker = ({ onDayPress, markedDays, ...props }: JalaliDatePickerProps) => {
  const { theme } = useTheme();
  const [cursor, setCursor] = useState(0);
  const { daysArray } = getAllDaysInMonth(cursor);

  function findSameDay(date) {
    for (let i = 0; i < markedDays.length; i++) {
      if (moment(markedDays[i].date, "YYYY-MM-DD").isSame(date)) {
        return markedDays[i]; // Return the object if found
      }
    }
    return null; // Return null if the object is not found
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
          columnWrapperStyle={styles.calendarColumnWrapperStyle}
          renderItem={({ index, item }) => {
            const sameDay = markedDays && markedDays.length && findSameDay(item.date);
            return sameDay ? (
              <Day key={index} {...sameDay} onPress={e => _onDayPress(item.date)} />
            ) : (
              <Day key={index} date={item.date} onPress={e => _onDayPress(item.date)} />
            );
          }}
          keyExtractor={i => i.data}
        />
      </View>
    </CalendarContext.Provider>
  );
};

export default JalaliDatePicker;
