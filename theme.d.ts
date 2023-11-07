import "@rneui/themed";
import { Colors } from "@rneui/themed";
import { GestureResponderEvent } from "react-native";
import { TextStyle } from "react-native";

declare module "@rneui/themed" {
  export interface InputProps {
    required?: boolean;
    labelNumber?: number;
    name?: string; // required by formik
    type?: "date" | "text";
  }

  export interface TextProps {
    heading1?: boolean;
    heading1Style?: TextStyle;
    heading2?: boolean;
    heading2Style?: TextStyle;
    subtitle1?: boolean;
    subtitle1Style?: TextStyle;
    subtitle2?: boolean;
    subtitle2Style?: TextStyle;
    body1?: boolean;
    body1Style?: TextStyle;
    body2?: boolean;
    body2Style?: TextStyle;
    caption?: boolean;
    captionStyle?: TextStyle;
    cta1?: boolean;
    cta1Style?: TextStyle;
    cta2?: boolean;
    cta2Style?: TextStyle;
    cta3?: boolean;
    cta3Style?: TextStyle;

    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    center?: boolean;
    type?: keyof Colors;
    color?: string;
  }

  export interface ButtonProps {
    onPress?: (e?: FormEvent<HTMLFormElement>) => void;
  }

  export interface ComponentTheme {
    Input: Partial<InputProps>;
    Text: Partial<TextProps>;
  }
}
