import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: { margin: 7 },
  calendarContentContainerStyle: { display: "flex", justifyContent: "space-evenly" },
  divider: theme => ({ borderBottomWidth: 1, borderColor: theme.colors.grey0, width: "100%" }),
  dayText: { textAlign: "center" },
  viewComponent: {
    padding: 6,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    display: "flex",
    marginBottom: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
