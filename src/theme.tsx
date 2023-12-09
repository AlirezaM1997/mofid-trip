import { createTheme } from "@rneui/themed";
import { DefaultTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, PressableProps } from "react-native";
import { WIDTH } from "./constants";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PRIMARY_COLOR = "#FF4332";
export const SECONDARY_COLOR = "#101010";

const getTextTheme = ({ bold, italic, underline, center, color, type, ...props }, theme, isRtl) => {
  let style = {
    fontSize: 14,
    fontStyle: italic ? "italic" : "normal",
    textDecorationLine: underline ? "underline" : "none",
    textAlign: center ? "center" : isRtl ? "right" : "left",
    color: color ? color : type ? theme.colors[type] : theme.colors.black,
    ...Platform.select({
      web: {
        width: props.numberOfLines ? "100%" : "auto",
        fontFamily: bold
          ? 'DanaNoEnDemiBold, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          : 'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      },
      android: {
        fontFamily: bold ? "DanaNoEnDemiBold" : "DanaNoEn",
      },
      ios: {
        fontFamily: bold ? "DanaNoEnDemiBold" : "DanaNoEn",
      },
    }),
  };

  const heading1Style = { fontSize: 18, lineHeight: 26 };
  const heading2Style = { fontSize: 16 };
  const subtitle1Style = { fontSize: 14 };
  const subtitle2Style = { fontSize: 14 };
  const body1Style = { fontSize: 14 };
  const body2Style = { fontSize: 12 };
  const captionStyle = { fontSize: 12 };
  const cta1Style = { fontSize: 16 };
  const cta2Style = { fontSize: 14 };
  const cta3Style = { fontSize: 12 };

  if (props.heading1) {
    style = { ...style, ...heading1Style };
  } else if (props.heading2) {
    style = { ...style, ...heading2Style };
  } else if (props.subtitle1) {
    style = { ...style, ...subtitle1Style };
  } else if (props.subtitle2) {
    style = { ...style, ...subtitle2Style };
  } else if (props.body1) {
    style = { ...style, ...body1Style };
  } else if (props.body2) {
    style = { ...style, ...body2Style };
  } else if (props.caption) {
    style = { ...style, ...captionStyle };
  } else if (props.cta1) {
    style = { ...style, ...cta1Style };
  } else if (props.cta2) {
    style = { ...style, ...cta2Style };
  } else if (props.cta3) {
    style = { ...style, ...cta3Style };
  }

  return {
    style: style,
  };
};

export const theme = isRtl =>
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
      info: "#4A8BEB",
    },
    darkColors: {
      primary: "blue",
    },
    components: {
      ListItemTitle: {
        style: {
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
          fontWeight: "400",
        },
      },
      ListItemSubtitle: {
        style: {
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
          fontWeight: "400",
        },
      },
      ListItemCheckBox: (props, theme) => ({
        checkedIcon: <Ionicons name="md-checkbox" size={24} color={theme.colors.primary} />,
        uncheckedIcon: <Ionicons name="square-outline" size={24} color={theme.colors.black} />,
      }),
      Image: {
        placeholderStyle: {
          display: "none",
        },
      },
      Skeleton: {
        style: {
          backgroundColor: "#e1e8ee",
        },
        LinearGradientComponent: ({ colors, ...props }) => (
          <LinearGradient {...props} colors={["#e1e8ee", "#d1d8de", "#e1e8ee"]} />
        ),
      },
      Chip: ({ color, ...props }, theme) => {
        return {
          buttonStyle: {
            borderColor: color ? theme.colors[color] : theme.colors.primary,
            padding: 0,
          },
          titleStyle: {
            color: color ? theme.colors[color] : theme.colors.primary,
            fontFamily:
              'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          },
        };
      },
      Text: ({ bold, italic, underline, center, color, type, ...props }, theme) => {
        let style = {
          fontSize: 14,
          fontStyle: italic ? "italic" : "normal",
          textDecorationLine: underline ? "underline" : "none",
          textAlign: center ? "center" : isRtl ? "right" : "left",
          color: color ? color : type ? theme.colors[type] : theme.colors.black,
          fontWeight: bold ? "bold" : "normal",
          ...Platform.select({
            web: {
              width: props.numberOfLines ? "100%" : "auto",
              fontFamily: bold
                ? 'DanaNoEnDemiBold, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                : 'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: bold ? "DanaNoEnDemiBold" : "DanaNoEn",
            },
            ios: {
              fontFamily: bold ? "DanaNoEnDemiBold" : "DanaNoEn",
            },
          }),
        };

        const heading1Style = { fontSize: 18, lineHeight: 26 };
        const heading2Style = { fontSize: 16 };
        const subtitle1Style = { fontSize: 14 };
        const subtitle2Style = { fontSize: 14 };
        const body1Style = { fontSize: 14 };
        const body2Style = { fontSize: 12 };
        const captionStyle = { fontSize: 12 };
        const cta1Style = { fontSize: 16 };
        const cta2Style = { fontSize: 14 };
        const cta3Style = { fontSize: 12 };

        if (props.heading1) {
          style = { ...style, ...heading1Style };
        } else if (props.heading2) {
          style = { ...style, ...heading2Style };
        } else if (props.subtitle1) {
          style = { ...style, ...subtitle1Style };
        } else if (props.subtitle2) {
          style = { ...style, ...subtitle2Style };
        } else if (props.body1) {
          style = { ...style, ...body1Style };
        } else if (props.body2) {
          style = { ...style, ...body2Style };
        } else if (props.caption) {
          style = { ...style, ...captionStyle };
        } else if (props.cta1) {
          style = { ...style, ...cta1Style };
        } else if (props.cta2) {
          style = { ...style, ...cta2Style };
        } else if (props.cta3) {
          style = { ...style, ...cta3Style };
        }

        return {
          style: style,
        };
      },
      Button: (props, theme) => {
        const { type, color, size } = props;

        let buttonStyle: any = {
          gap: 8,
          borderRadius: 12,
          gap: 8,
          fontWeight: "400",
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
        };

        let containerStyle = {};

        let titleStyle = {};

        if (type === "clear" && color === "secondary") {
          titleStyle = {
            ...buttonStyle,
            color: SECONDARY_COLOR,
          };
        }
        if (type === "outline" && color === "secondary") {
          buttonStyle = {
            ...buttonStyle,
            borderColor: SECONDARY_COLOR,
          };
          titleStyle = {
            ...buttonStyle,
            color: SECONDARY_COLOR,
          };
        }

        if (size === "lg") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 47.6 };
        }

        if (size === "sm") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 31.6 };
        }

        if (size === "md") {
          containerStyle = { ...buttonStyle, height: Platform.OS === "web" ? "auto" : 39.6 };
        }

        return {
          buttonStyle: buttonStyle,
          titleStyle: {
            ...titleStyle,
            ...buttonStyle,
          },
          containerStyle: { ...containerStyle, ...buttonStyle },
        };
      },
      BottomSheet: (props, theme) => ({
        containerStyle: {
          backgroundColor: theme.colors.white,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          width: WIDTH,
          bottom: 0,
          position: "absolute",
          paddingVertical: 16,
        },
        backdropStyle: {
          backgroundColor: "#0003",
        },
      }),
      Input: {
        errorStyle: Platform.select({
          web: {
            fontFamily:
              'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          },
          android: {
            fontFamily: "DanaNoEn",
          },
          ios: {
            fontFamily: "DanaNoEn",
          },
        }),
        leftIconContainerStyle: {
          position: "absolute",
          left: 10,
        },
        labelStyle: {
          marginBottom: 5,
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
        },
        inputStyle: {
          borderWidth: 1,
          borderRadius: 12,
          padding: 15,
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
          fontWeight: "400",
          textAlign: isRtl ? "right" : "left",
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
      CheckBox: (props, theme) => ({
        Component: ({ children, ...props }: PressableProps) => (
          <View style={{ marginHorizontal: -5 }}>
            <Pressable {...props} style={[props.style, { margin: 0, padding: 0 }]}>
              {children}
            </Pressable>
          </View>
        ),
        textStyle: {
          color: theme.colors.grey3,
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
          fontWeight: "400",
        },
        checkedIcon: <Ionicons name="md-checkbox" size={24} color={theme.colors.primary} />,
        uncheckedIcon: <Ionicons name="square-outline" size={24} color={theme.colors.black} />,
      }),
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
          ...Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
          fontWeight: "400",
          ...Platform.select({
            web: {
              outlineStyle: "none",
            },
          }),
        },
      },
      TabItem: {
        titleStyle: Platform.select({
          web: {
            fontFamily:
              'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          },
          android: {
            fontFamily: "DanaNoEn",
          },
          ios: {
            fontFamily: "DanaNoEn",
          },
        }),
      },
      Card: {
        containerStyle: {
          borderWidth: 0,
          borderRadius: 12,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          padding: 0,
        },
      },
      CardTitle: (props, theme) => {
        let baseStyle = getTextTheme(props, theme, isRtl);
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            paddingHorizontal: 12,
            marginBottom: 5,
          },
        };
      },
      CardFeaturedTitle: (props, theme) => {
        let baseStyle = getTextTheme(props, theme, isRtl);
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            paddingHorizontal: 12,
          },
        };
      },
      CardFeaturedSubtitle: (props, theme) => {
        let baseStyle = getTextTheme(props, theme, isRtl);
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            paddingHorizontal: 12,
          },
        };
      },
      CardImage: {
        style: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      },
      Avatar: {
        avatarStyle: {
          // left: "50%",
          // top: "50%",
          // transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
        },
      },
      CardDivider: (props, theme) => ({
        color: theme.colors.grey0,
      }),
      Divider: ({ thickness, borderStyle, bgColor, style, ...props }, theme) => ({
        style: {
          borderWidth: thickness,
          backgroundColor: "transparent",
          borderColor: theme.colors[bgColor as string] ?? theme.colors.grey1,
          borderStyle: borderStyle,
        },
      }),
      Badge: ({ type, color, ...props }, theme) => {
        let styles = {
          style: {
            padding: 10,
            margin: 10,
          },
          badgeStyle: {
            padding: 12,
            borderRadius: 8,
            alignSelf: "flex-end",
          },
          textStyle: Platform.select({
            web: {
              fontFamily:
                'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
            android: {
              fontFamily: "DanaNoEn",
            },
            ios: {
              fontFamily: "DanaNoEn",
            },
          }),
        };
        const c = theme.colors[color as string] ?? theme.colors.primary;
        const color2 = theme.colors[color as string];
        if (type === "solid") {
          styles = {
            ...styles,
            badgeStyle: {
              ...styles.badgeStyle,
              backgroundColor: c + "66",
              borderColor: c,
            },
            textStyle: {
              ...styles.textStyle,
              color: theme.colors.grey4,
            },
          };
        } else if (type === "outline") {
          styles = {
            ...styles,
            badgeStyle: {
              ...styles.badgeStyle,
              backgroundColor: "transparent",
              borderColor: c,
            },
            textStyle: {
              ...styles.textStyle,
              color: theme.colors.grey4,
            },
          };
        } else if (type === "clear") {
          styles = {
            ...styles,
            badgeStyle: {
              ...styles.badgeStyle,
              backgroundColor: "transparent",
            },
            textStyle: {
              ...styles.textStyle,
              color: c,
            },
          };
        }
        return styles;
      },
    },
  });

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    background: "#fff",
  },
};
