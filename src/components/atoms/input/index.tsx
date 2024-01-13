import { RootState } from "@src/store";
import { Ref, forwardRef } from "react";
import { useSelector } from "react-redux";
import InputWithDate from "./input-with-date";
import { LanguageChoiceEnum } from "@src/gql/generated";
import { InputProps, Input as NativeInput } from "@rneui/themed";
import { Platform, StyleSheet, TextInput, ViewStyle } from "react-native";

const Input = forwardRef((props: InputProps, ref: Ref<TextInput>) => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice?.settingDetail);

  return props.type === "date" ? (
    <InputWithDate ref={ref} {...props} />
  ) : (
    <NativeInput ref={ref} {...props} style={styles.input(language)} />
  );
});

const styles = StyleSheet.create({
  input: ((lng: LanguageChoiceEnum) => ({
    ...Platform.select({
      web: {
        fontFamily:
          lng === LanguageChoiceEnum.EnUs
            ? 'DanaNoEn, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            : 'DanaFaNum, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      },
      android: {
        fontFamily: "DanaFaNum",
      },
      ios: {
        fontFamily: "DanaFaNum",
      },
    }),
  })) as ViewStyle,
});

export default Input;
