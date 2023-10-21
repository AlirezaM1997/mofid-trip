import { Text, useTheme } from "@rneui/themed"
import React, { useState } from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"

type BasicTabsProps = {
  tabContainerStyle?: ViewStyle
  tabStyle?: ViewStyle
  activeTabStyle?: ViewStyle
  tabs: {
    title: string | React.ReactElement
    body: React.ReactElement
  }[]
}

const BasicTabs = ({ tabContainerStyle, tabStyle, activeTabStyle, tabs }: BasicTabsProps) => {
  const { theme } = useTheme()
  const [activeStep, setActiveStep] = useState(0)

  const getActiveStyles = (step) => (activeStep === step ? [styles.activeTabStyle(theme), activeTabStyle] : [])

  return (
    <>
      <View style={[styles.tabContainerStyle, tabContainerStyle]}>
        {tabs.map((t, i) => (
          <Pressable key={i} onPress={() => setActiveStep(i)} style={[styles.tabStyle(theme), tabStyle, ...getActiveStyles(i)]}>
            {t.title}
          </Pressable>
        ))}
      </View>

      {tabs.map((t, i) => (
        <View style={{ display: activeStep === i ? "flex" : "none" }}>{t.body}</View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  tabContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
  },
  tabStyle: (theme) => ({
    backgroundColor: theme.colors.primary,
    flexGrow: 1,
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  activeTabStyle: (theme) => ({ borderBottomWidth: 3, borderColor: theme.colors.white }),
})

export default BasicTabs
