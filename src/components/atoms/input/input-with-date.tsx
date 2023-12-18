import JalaliDatePicker from "@modules/jalali-date-picker";
import { InputProps, Input as NativeInput, Overlay } from "@rneui/themed";
import { FieldProps } from "formik";
import { View } from "react-native";

type InputWithDateProps = InputProps & {
  form?: FieldProps["form"] | undefined;
  field?: FieldProps["field"] | undefined;
  meta?: FieldProps["meta"] | undefined;
};

const InputWithDate = ({ form, field, ...props }: InputWithDateProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  const toggleOverlay = () => setIsVisible(!isVisible);

  const _onFocus = e => {
    if (props.onFocus) props.onFocus(e);
    inputRef?.current?.input?.blur();
    setIsVisible(true);
  };

  const handleDayPress = day => {
    form.setFieldValue(field.name, day.format("YYYY-MM-DD"));
    setIsVisible(false);
  };

  return (
    <View>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <JalaliDatePicker onDayPress={handleDayPress} />
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
