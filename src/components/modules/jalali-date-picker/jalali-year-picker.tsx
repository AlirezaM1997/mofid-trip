import moment from "jalali-moment";
import getAllDaysInMonth from "./helper";
import { CalendarContext } from "./context";
import { Feather } from "@expo/vector-icons";
import { FlatList, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Overlay, Text, useTheme } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const JalaliYearPicker = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { cursor, setCursor, yearCursor, setYearCursor } = useContext(CalendarContext);
  const { firstDayOfMonth } = getAllDaysInMonth(cursor);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleOverlay = () => setIsVisible(!isVisible);

  const currentYear = moment(new Date()).locale("fa").format("jYYYY");

  const years = [];

  for (let i = 0; years.length <= 15; i++) {
    years.push(+currentYear - yearCursor * 16 - i);
  }

  return (
    <View>
      <Button type="clear" onPress={toggleOverlay}>
        <Text>{localizeNumber(firstDayOfMonth.locale("fa").format("jYYYY"))}</Text>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            disabled={yearCursor === 7}
            onPress={() => setYearCursor(yearCursor + 1)}
            type="clear"
            icon={<Feather name="chevron-right" size={24} color={theme.colors.black} />}
          />
          <Text>{tr("choose the year")}</Text>
          <Button
            disabled={yearCursor === 0}
            onPress={() => setYearCursor(yearCursor - 1)}
            type="clear"
            icon={<Feather name="chevron-left" size={24} color={theme.colors.black} />}
          />
        </View>
        <FlatList
          numColumns={4}
          data={years}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16, direction: "ltr" }}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                setCursor(cursor - (+firstDayOfMonth.locale("fa").format("jYYYY") - item) * 12);
                toggleOverlay();
              }}
              type="clear"
              titleStyle={{
                color:
                  item === +firstDayOfMonth.locale("fa").format("jYYYY")
                    ? theme.colors.white
                    : theme.colors.black,
              }}
              containerStyle={{
                width: 75,
                backgroundColor:
                  item === +firstDayOfMonth.locale("fa").format("jYYYY")
                    ? theme.colors.black
                    : theme.colors.grey0,
              }}
              buttonStyle={{ padding: 12 }}>
              {localizeNumber(item)}
            </Button>
          )}
          keyExtractor={item => item.toString()}
        />
      </Overlay>
    </View>
  );
};

export default JalaliYearPicker;
