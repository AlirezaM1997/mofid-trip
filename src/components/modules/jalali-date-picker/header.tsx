import { Button, Text, useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import getAllDaysInMonth from "./helper";
import { useContext } from "react";
import { CalendarContext } from "./context";

const Header = () => {
  const { cursor, setCursor } = useContext(CalendarContext);
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { firstDayOfMonth } = getAllDaysInMonth(cursor);

  return (
    <View style={styles.btnContainer}>
      <Button
        onPress={() => setCursor(cursor - 1)}
        type="clear"
        icon={<Feather name="chevron-right" size={24} color={theme.colors.black} />}
      />
      <Text>{localizeNumber(firstDayOfMonth.locale("fa").format("jMMMM jYYYY"))}</Text>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

export default Header;
