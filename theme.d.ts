import "@rneui/themed";
import { GestureResponderEvent } from "react-native";
import { TextStyle } from "react-native";

declare module "@rneui/themed" {
  export interface InputProps {
    required?: boolean;
    labelNumber?: number;
  }

  export interface TextProps {
    h5?: boolean;
    h5Style?: TextStyle;
    h6?: boolean;
    h6Style?: TextStyle;
    body?: boolean;
    bodyStyle?: TextStyle;
    caption?: boolean;
    CaptionStyle?: TextStyle;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    center?: boolean;
  }

  export interface ButtonProps {
    onPress?: (e?: FormEvent<HTMLFormElement>) => void;
  }

  export interface ComponentTheme {
    Input: Partial<InputProps>;
    Text: Partial<TextProps>;
  }
}
