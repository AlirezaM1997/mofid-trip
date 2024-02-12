import Header from "./header";
import { useState } from "react";
import { styles } from "./styles";
import WeekDays from "./week-days";
import Day, { DayProps } from "./day";
import getAllDaysInMonth from "./helper";
import { CalendarContext } from "./context";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "@rneui/themed";
import moment, { Moment } from "jalali-moment";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

type JalaliDatePickerProps = {
  onDayPress?: ({ dayPressed }) => void;
  markedDays?: DayProps[];
  disableDaysAfter?: moment.Moment; // gregorian based
  disableDaysBefore?: moment.Moment; // gregorian based
  disableDaysIn?: moment.Moment[]; // gregorian based
};

const JalaliDatePicker = ({ onDayPress, markedDays, ...props }: JalaliDatePickerProps) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [cursor, setCursor] = useState(0);
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
            const markedDay = markedDays && markedDays.length && findMarkedDay(item.date as Moment);

            const validMarkedDay = markedDay as DayProps;

            return (
              <View>
                <Day
                  key={index}
                  date={item.date}
                  onPress={e => _onDayPress(item.date)}
                  disabled={shouldDisable(item.date as Moment) as boolean}
                  ViewComponent={() =>
                    item.date && (
                      <View style={[validMarkedDay?.buttonStyle, styles.viewComponent]}>
                        <Text
                          disabled={!validMarkedDay?.dayData}
                          style={[validMarkedDay?.titleStyle]}
                          heading2={validMarkedDay?.dayData ? false : true}>
                          {localizeNumber(moment(item.date).locale("fa").format("D"))}
                        </Text>
                        {validMarkedDay?.dayData && (
                          <Text style={[validMarkedDay?.titleStyle]} error>
                            {`${localizeNumber(validMarkedDay?.dayData?.toString() as string)} ${tr(
                              "man"
                            )}`}
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
