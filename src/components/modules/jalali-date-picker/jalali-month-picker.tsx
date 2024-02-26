import moment from "jalali-moment";
import getAllDaysInMonth from "./helper";
import { CalendarContext } from "./context";
import { FlatList, View } from "react-native";
import React, { useContext, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { Button, Overlay, Text, useTheme } from "@rneui/themed";

const JalaliMonthPicker = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { cursor, setCursor } = useContext(CalendarContext);
  const { firstDayOfMonth } = getAllDaysInMonth(cursor);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleOverlay = () => setIsVisible(!isVisible);

  const months = [];

  for (let i = 0; months.length <= 11; i++) {
    months.push(moment().locale("fa").clone().jMonth(i).format("jMMMM"));
  }

  return (
    <View>
      <Button type="clear" onPress={toggleOverlay}>
        <Text>{firstDayOfMonth.locale("fa").format("jMMMM")}</Text>
      </Button>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          direction: "rtl",
          alignItems: "center",
          gap: 20,
          padding: 24,
        }}>
        <Text>{tr("choose the month")}</Text>
        <FlatList
          numColumns={3}
          data={months}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item, index }) => (
            <Button
              onPress={() => {
                setCursor(cursor - (+firstDayOfMonth.locale("fa").format("jM") - index - 1));
                toggleOverlay();
              }}
              type="clear"
              titleStyle={{
                color:
                  item === firstDayOfMonth.locale("fa").format("jMMMM")
                    ? theme.colors.white
                    : theme.colors.black,
              }}
              containerStyle={{
                width: 100,
                backgroundColor:
                  item === firstDayOfMonth.locale("fa").format("jMMMM")
                    ? theme.colors.black
                    : theme.colors.grey0,
              }}
              buttonStyle={{ padding: 12 }}>
              {item}
            </Button>
          )}
          keyExtractor={item => item}
        />
      </Overlay>
    </View>
  );
};

export default JalaliMonthPicker;
