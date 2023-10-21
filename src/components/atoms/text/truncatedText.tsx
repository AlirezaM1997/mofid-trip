import React from "react"
import { DimensionValue, StyleSheet, TextStyle } from "react-native"
import Text from "."

type PropsType = {
  title: string
  style?: TextStyle
  width?: DimensionValue
  variant?: "heading1" | "heading2" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "cta1" | "cta2" | "cta3"
}

const TruncatedText = ({ title, style, variant, width = 200, ...props }: PropsType) => {
  return (
    <Text variant={variant} numberOfLines={1} style={[styles.truncatedText, style, { width: width }]} {...props}>
      {title}
    </Text>
  )
}

const styles = StyleSheet.create({
  truncatedText: {
    height: "auto",
    overflow: "hidden",
    textAlign:'left'
  },
})

export default TruncatedText
