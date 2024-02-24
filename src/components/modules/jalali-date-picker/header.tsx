import { useContext } from "react";
import { CalendarContext } from "./context";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import JalaliYearPicker from "./jalali-year-picker";
import JalaliMonthPicker from "./jalali-month-picker";

const Header = () => {
  const { theme } = useTheme();
  const { cursor, setCursor } = useContext(CalendarContext);

  return (
    <View style={styles.btnContainer}>
      <Button
        onPress={() => setCursor(cursor - 1)}
        type="clear"
        icon={<Feather name="chevron-right" size={24} color={theme.colors.black} />}
      />
      <JalaliMonthPicker />
      <JalaliYearPicker />
      <Button
        onPress={() => setCursor(cursor + 1)}
        type="clear"
        icon={<Feather name="chevron-left" size={24} color={theme.colors.black} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
