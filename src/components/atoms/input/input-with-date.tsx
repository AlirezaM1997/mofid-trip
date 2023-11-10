import { InputProps, Input as NativeInput, Overlay } from "@rneui/themed";
import { useCalendarTheme } from "@src/hooks/calendar-theme";
import { FieldProps } from "formik";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

type InputWithDateProps = InputProps & {
  form?: FieldProps["form"] | undefined;
  field?: FieldProps["field"] | undefined;
  meta?: FieldProps["meta"] | undefined;
};

const InputWithDate = ({ form, field, ...props }: InputWithDateProps) => {
  const calendarTheme = useCalendarTheme();
  const today = new Date().toISOString().slice(0, 10);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRef = useRef(null)

  const toggleOverlay = () => setIsVisible(!isVisible);

  const _onFocus = e => {
    if (props.onFocus) props.onFocus(e);
    inputRef?.current?.input?.blur()
    setIsVisible(true);
  };

  const handleDayPress = day => {
    form.setFieldValue(field.name, day.dateString);
    setIsVisible(false);
  };

  return (
    <View>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [today]: { selected: true, disableTouchEvent: true },
          }}
          theme={calendarTheme}
        />
      </Overlay>
      <NativeInput {...props} ref={inputRef} value={field.value} onFocus={_onFocus} />
    </View>
  );
};

InputWithDate.defaultProps = {
  form: undefined,
  field: undefined,
};

export default InputWithDate;
