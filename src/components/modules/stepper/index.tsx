import { useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";

const Stepper = ({ steps, activeStep, isActive }) => {
  const theme = useTheme();

  const themeStyles = {
    successColor: { backgroundColor: theme.theme.colors.success },
    errorColor: { backgroundColor: theme.theme.colors.error },
    greyColor: { backgroundColor: theme.theme.colors.grey1 },
  };

  return (
    <View style={styles.container}>
      {steps.map((step: string, index: number) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              [styles.stepCircle, themeStyles.greyColor],
              index + 1 <= activeStep &&
                (isActive ? [themeStyles.successColor] : [themeStyles.greyColor]),
              index + 1 === activeStep && !isActive && [themeStyles.errorColor],
            ]}></View>

          <Text style={styles.stepLabel}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 13,
  },
  stepContainer: {
    alignItems: "center",
  },
  stepCircle: {
    width: 75,
    height: 8,

    justifyContent: "center",
    alignItems: "center",
  },

  stepLabel: {
    marginTop: 4,
    textAlign: "center",
  },
});

export default Stepper;
