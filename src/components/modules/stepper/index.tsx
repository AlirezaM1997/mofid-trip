import React from "react";
import { Text } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

const Stepper = ({ steps, activeStep, isActive }) => {
  const {theme} = useTheme();

  const themeStyles = {
    successColor: { backgroundColor: theme.colors.success },
    errorColor: { backgroundColor: theme.colors.error },
    greyColor: { backgroundColor: theme.colors.grey1 },
  };

  return (
    <View style={styles.container}>
      {steps.map((step: string, index: number) => (
        <View key={index} style={styles.stepContainer}>
          <Text numberOfLines={1} caption type={index + 1 <= activeStep ? (isActive ? "success" : "error") : "black"}>
            {step}
          </Text>

          <View
            style={[
              [styles.stepCircle, themeStyles.greyColor],
              index + 1 <= activeStep &&
                (isActive ? [themeStyles.successColor] : [themeStyles.errorColor]),
              index + 1 === activeStep && !isActive && [themeStyles.errorColor],
            ]}></View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  stepContainer: {
    gap: 4,
    flex: 1,
  },
  stepCircle: {
    height: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Stepper;
