import Text from "@src/components/atoms/text"
import dayjs from "dayjs"
import { FlatList, StyleSheet, View } from "react-native"
import moment, { Moment } from "moment"
import { useState } from "react"
import { Button, useTheme } from "@rneui/themed"
import { Feather } from "@expo/vector-icons"
import getAllDaysInMonth from "./helper"

const WeekDays = () => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <FlatList
      contentContainerStyle={style.contentContainerStyle}
      horizontal={false}
      numColumns={7}
      data={weekDays}
      columnWrapperStyle={style.columnWrapperStyle}
      renderItem={({ item }) => (
        <View key={item} style={style.cell}>
          <Text>{item}</Text>
        </View>
      )}
      keyExtractor={(item) => item}
    />
  )
}

const Day = ({ date, onPress }) => {
  const day = date ? moment(date).format("D") : ""
  return (
    <Button onPress={() => onPress(moment(date).add(1, "days"))} color="secondary" buttonStyle={style.buttonStyle} containerStyle={style.dayBtn} type="clear">
      <Text style={style.dayText}>{day}</Text>
    </Button>
  )
}

type DatePickerProps = {
  onDayPress: ({ dayPressed }: Moment) => void
}

const DatePicker = ({ onDayPress }: DatePickerProps) => {
  const { theme } = useTheme()
  const [cursor, setCursor] = useState(0)
  const { daysArray, yearWithMonth } = getAllDaysInMonth(cursor)

  return (
    <View style={style.root}>
      <View style={style.btnContainer}>
        <Button onPress={() => setCursor(cursor - 1)} type="clear" icon={<Feather name="chevron-left" size={24} color="black" />} />
        <Text>{yearWithMonth}</Text>
        <Button onPress={() => setCursor(cursor + 1)} type="clear" icon={<Feather name="chevron-right" size={24} color="black" />} />
      </View>
      <WeekDays />
      <View style={style.divider(theme)} />
      <FlatList
        contentContainerStyle={[style.contentContainerStyle, style.calendarContentContainerStyle]}
        columnWrapperStyle={style.calendarColumnWrapperStyle}
        horizontal={false}
        numColumns={7}
        data={daysArray}
        renderItem={({ index, item }) => <Day key={index} onPress={onDayPress} date={item.date} />}
        keyExtractor={(i) => i.data}
      />
    </View>
  )
}

const style = StyleSheet.create({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  dayBtn: {
    width: 35,
  },
  cell: {
    width: 26,
  },
  contentContainerStyle: { margin: 7 },
  calendarContentContainerStyle: { display: "flex", justifyContent: "space-evenly" },
  columnWrapperStyle: { gap: 20 },
  calendarColumnWrapperStyle: { gap: 10 },
  divider: (theme) => ({ borderBottomWidth: 1, borderColor: theme.colors.grey0, width: "100%" }),
  btnContainer: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20 },
  dayText: { textAlign: "center" },
  buttonStyle: { padding: 12 },
})

export default DatePicker
