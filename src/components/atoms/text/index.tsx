import { Text as ThemedText } from "@rneui/themed"
import useIsRtl from "@src/hooks/localization"
import { SECONDARY_COLOR } from "@src/theme"
import { ReactElement, ReactNode } from "react"
import { Platform, StyleSheet, TextStyle } from "react-native"

type TextPropsType = {
  props?: any
  color: string
  style?: TextStyle | TextStyle[]
  numberOfLines?: number
  children: string | ReactElement | ReactNode
  variant?: "heading1" | "heading2" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "cta1" | "cta2" | "cta3"
}

export default function Text({ children, variant = "body1", style, color, numberOfLines, ...props }: TextPropsType) {
  const isRtl = useIsRtl()

  const styles = StyleSheet.create({
    base: {
      ...Platform.select({
        web: {
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        },
      }),
      fontWeight: "400",
    },
    colorStyle: { color: color },
    heading1: {
      fontSize: 18,
      // fontWeight: "800",
      lineHeight: 26,
    },
    heading2: {
      fontSize: 16,
      // fontWeight: "600",
    },
    subtitle1: {
      fontSize: 14,
      // fontWeight: "600",
    },
    subtitle2: {
      fontSize: 14,
      // fontWeight: "500",
    },
    body1: {
      fontSize: 14,
      // fontWeight: "400",
    },
    body2: {
      fontSize: 12,
      // fontWeight: "500",
    },
    caption: {
      fontSize: 12,
      // fontWeight: "400",
    },
    cta1: {
      fontSize: 16,
      // fontWeight: "600",
    },
    cta2: {
      fontSize: 14,
      // fontWeight: "500",
    },
    cta3: {
      fontSize: 12,
      // fontWeight: "500",
    },
  })
  return (
    <ThemedText numberOfLines={numberOfLines} style={[styles.base, styles[variant], styles.colorStyle, style]} {...props}>
      {children}
    </ThemedText>
  )
}

Text.defaultProps = {
  style: {},
  variant: "body2",
  color: SECONDARY_COLOR,
}
