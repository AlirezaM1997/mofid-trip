import moment from "jalali-moment";
import { FieldProps } from "formik";
import { useRef, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import JalaliDatePicker from "@modules/jalali-date-picker";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import { InputProps, Input as NativeInput, Overlay, useTheme } from "@rneui/themed";

type InputWithDateProps = InputProps & {
  form?: FieldProps["form"] | undefined;
  field?: FieldProps["field"] | undefined;
  meta?: FieldProps["meta"] | undefined;
};

const InputWithDate = ({ form, field, ...props }: InputWithDateProps) => {
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const [markedDays, setMarkedDays] = useState([]);
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleOverlay = () => setIsVisible(!isVisible);

  const _onFocus = e => {
    if (props.onFocus) props.onFocus(e);
    inputRef?.current?.input?.blur();
    setIsVisible(true);
  };

  const handleDayPress = day => {
    form?.setFieldValue(field?.name as string, day.format("YYYY-MM-DD"));
    setMarkedDays([
      {
        date: day,
        buttonStyle: styles.startAndEndDayButtonStyle(theme),
        containerStyle: styles.startAndEndDayContainerStyle,
        titleStyle: styles.startAndEndDayTitleStyle(theme),
      },
    ]);
    setIsVisible(false);
  };

  return (
    <>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ direction: "rtl" }}>
        <JalaliDatePicker onDayPress={handleDayPress} markedDays={markedDays} />
      </Overlay>
      <NativeInput {...props} ref={inputRef} value={field?.value && localizeNumber(moment(field?.value).locale("fa").format("YYYY/MM/DD"))} onFocus={_onFocus} />
    </>
  );
};
const styles = StyleSheet.create({
  startAndEndDayButtonStyle: (theme => ({
    backgroundColor: theme.colors.black,
  })) as ViewStyle,
  startAndEndDayContainerStyle: {
    width: 45,
  },
  startAndEndDayTitleStyle: (theme => ({
    color: theme.colors.white,
  })) as ViewStyle,
});

InputWithDate.defaultProps = {
  form: undefined,
  field: undefined,
};

export default InputWithDate;
