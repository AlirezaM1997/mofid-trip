import React from "react";
import { View, StyleSheet } from "react-native";

const BottomActions = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingRight: "4%",
    paddingLeft: "4%",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default BottomActions;
