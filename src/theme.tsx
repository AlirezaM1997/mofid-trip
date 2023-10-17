import { createTheme } from "@rneui/themed"
import { DefaultTheme } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Platform } from "react-native"
import useIsRtl from "./hooks/localization"

export const PRIMARY_COLOR = "#FF4332"
export const SECONDARY_COLOR = "#101010"

export const theme = (isRtl) =>
  createTheme({
    lightColors: {
      primary: PRIMARY_COLOR,
      secondary: SECONDARY_COLOR,
      grey0: "#F3F3F3",
      grey1: "#DADADA",
      grey2: "#ADAFAE",
      grey3: "#878787",
      grey4: "#555",
      grey5: "#333",
      error: "#E73F3F",
      warning: "#FEC30D",
      success: "#66CD6A",
    },
    darkColors: {
      primary: "blue",
    },
    components: {
      ListItem: {
        containerStyle: { direction: isRtl ? "rtl" : "ltr" },
      },
      ListItemAccordion: {
        containerStyle: { direction: isRtl ? "rtl" : "ltr" },
      },
      ListItemTitle: {
        style: {
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
      },
      ListItemSubtitle: {
        style: {
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
      },
      Image: {
        placeholderStyle: {
          display: "none",
        },
      },
      Skeleton: {
        style: {
          backgroundColor: "#e1e8ee",
        },
        LinearGradientComponent: ({ colors, ...props }) => <LinearGradient {...props} colors={["#e1e8ee", "#d1d8de", "#e1e8ee"]} />,
      },
      Text: (props, theme) => ({
        style: {
          fontSize: 14,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
          direction: isRtl ? "rtl" : "ltr",
        },
        h1Style: {
          fontSize: 18,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
        h2Style: {
          fontSize: 16,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
      }),
      Button: (props, theme) => {
        const { type, color, size } = props

        let buttonStyle: any = {
          borderRadius: 12,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        }

        let containerStyle = {}

        let titleStyle = {}

        if (type === "clear" && color === "secondary") {
          titleStyle = {
            ...buttonStyle,
            color: SECONDARY_COLOR,
          }
        }
        if (type === "outline" && color === "secondary") {
          buttonStyle = {
            ...buttonStyle,
            borderColor: SECONDARY_COLOR,
          }
          titleStyle = {
            ...buttonStyle,
            color: SECONDARY_COLOR,
          }
        }

        if (size === "lg") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 47.6 }
        }

        if (size === "sm") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 31.6 }
        }

        if (size === "md") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 39.6 }
        }

        return {
          buttonStyle: buttonStyle,
          titleStyle: {
            ...titleStyle,
            ...buttonStyle,
          },
          containerStyle: { ...containerStyle, ...buttonStyle },
        }
      },
      Input: {
        inputStyle: {
          borderWidth: 1,
          borderRadius: 12,
          padding: 15,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
          direction: isRtl ? "rtl" : "ltr",
        },
        inputContainerStyle: {
          borderBottomWidth: 0,
          width: "100%",
        },
        containerStyle: {
          paddingHorizontal: 0,
          margin: 0,
        },
      },
      CheckBox: {
        textStyle: {
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
      },
      SearchBar: {
        containerStyle: {
          backgroundColor: "#fff",
          borderBottomWidth: 0,
          padding: 25,
        },
        inputContainerStyle: {
          height: 55,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#DADADA",
          borderBottomWidth: 1,
          borderRadius: 12,
        },
        inputStyle: {
          fontSize: 12,
          fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontWeight: "400",
        },
      },
    },
  })

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    background: "#fff",
  },
}
