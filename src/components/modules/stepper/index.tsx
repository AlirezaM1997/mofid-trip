import { useTheme } from "@rneui/themed"
import Text from "@src/components/atoms/text"
import React from "react"
import { View, StyleSheet } from "react-native"

const Stepper = ({ steps, activeStep, isActive }) => {
  const theme = useTheme()

  const themeStyles = {
    successColor: { backgroundColor: theme.theme.colors.success },
    errorColor: { backgroundColor: theme.theme.colors.error },
    greyColor: { backgroundColor: theme.theme.colors.grey1 },
    borderGreyColor: { borderColor: theme.theme.colors.grey1 },
    textWhiteColor: { color: theme.theme.colors.white },
  }

  return (
    <View style={styles.container}>
      {steps.map((step: string, index: number) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              [styles.stepCircle, themeStyles.borderGreyColor],
              index + 1 <= activeStep && (isActive ? [styles.completedStep, themeStyles.successColor] : [styles.failedStep, themeStyles.greyColor]),
              index + 1 === activeStep && !isActive && [styles.rejectedStep, themeStyles.errorColor],
            ]}
          >
            <Text
              style={index + 1 <= activeStep && isActive ? themeStyles.textWhiteColor : index + 1 === activeStep && !isActive && themeStyles.textWhiteColor}
            >
              {index + 1}
            </Text>
          </View>

          <Text style={styles.stepLabel}>{step}</Text>
        </View>
      ))}
    </View>
  )
}

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
    width: 32,
    height: 32,
    borderRadius: 15,
    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",
  },

  completedStep: {
    borderWidth: 0,
  },
  failedStep: {
    borderWidth: 0,
  },
  rejectedStep: {
    borderWidth: 0,
  },

  stepLabel: {
    marginTop: 4,
    textAlign: "center",
  },
})

export default Stepper
