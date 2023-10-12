import { InputProps, createTheme } from "@rneui/themed";
import { Platform, Text } from "react-native";

export const theme = createTheme({
  lightColors: {
    primary: "#000C40",
    secondary: "#1890FF",
  },
  components: {
    Input: (props: InputProps, theme) => {
      const columnSize = 9;
      const labelNumber = 2;

      return {
        errorMessage:
          props.required && !props.errorMessage ? "*" : props.errorMessage,
        labelStyle: {
          flex: props.labelNumber ?? labelNumber,
          color: theme.colors.black,
          fontWeight: "normal",
        },
        style: {
          fontSize: 16,
        },
        placeholderTextColor: theme.colors.grey4,
        inputContainerStyle: {
          borderBottomWidth: 0,
          flex: columnSize - (props.labelNumber ?? labelNumber),
        },
        containerStyle: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: theme.colors.grey5,
        },
      };
    },
    Button: (props, theme) => {
      const { type, color, size } = props;

      let containerStyle = {};
      let titleStyle = {};
      let buttonStyle: any = {
        borderRadius: 5,
      };

      if (type === "clear" && color === "secondary") {
        titleStyle = {
          ...buttonStyle,
          color: theme.colors.secondary,
        };
      } else if (type === "clear" && color === "error") {
        titleStyle = {
          ...buttonStyle,
          color: theme.colors.error,
        };
      }

      if (type === "outline" && color === "secondary") {
        buttonStyle = {
          ...buttonStyle,
          borderColor: theme.colors.secondary,
        };
        titleStyle = {
          ...buttonStyle,
          color: theme.colors.secondary,
        };
      }

      if (size === "lg") {
        containerStyle = {
          ...buttonStyle,
          height: Platform.OS === "web" ? "auto" : 47.6,
        };
      }

      if (size === "sm") {
        containerStyle = {
          ...buttonStyle,
          height: Platform.OS === "web" ? "auto" : 31.6,
        };
      }

      if (size === "md") {
        containerStyle = {
          ...buttonStyle,
          height: Platform.OS === "web" ? "auto" : 39.6,
        };
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
  },
});
