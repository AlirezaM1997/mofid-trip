import { InputProps, Input as NativeInput, Overlay } from "@rneui/themed";
import { useCalendarTheme } from "@src/hooks/calendar-theme";
import { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const InputWithDate = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const today = new Date().toISOString().slice(0, 10);
  const [_value, _setValue] = useState<string>();
  const calendarTheme = useCalendarTheme();

  const toggleOverlay = () => setIsVisible(!isVisible);

  const _onPointerEnter = e => {
    if (props.onPointerEnter) props.onPointerEnter(e);
    setIsVisible(true);
  };

  const handleDayPress = day => {
    _setValue(day.dateString);
    setIsVisible(false);
  };

  if (props.type === "date") {
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
        <NativeInput onPointerEnter={_onPointerEnter} value={_value} {...props} />
      </View>
    );
  }
  return <NativeInput {...props} />;
};

export default InputWithDate;
