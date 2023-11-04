import { InputProps, Input as NativeInput } from "@rneui/themed";
import InputWithDate from "./input-with-date";

const Input = (props: InputProps) =>
  props.type === "date" ? <InputWithDate {...props} /> : <NativeInput {...props} />;

export default Input;
