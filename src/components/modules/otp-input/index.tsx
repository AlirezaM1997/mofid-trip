import React, { Ref, useEffect, useState } from "react";
import { useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Input from "@atoms/input";
import { TextInput } from "react-native-gesture-handler";
import parseText from "@src/helper/number-input";

type OtpInputPropsType = {
  onComplete: (t: string) => void;
};

const OtpInput = ({ onComplete }: OtpInputPropsType) => {
  const { theme } = useTheme();
  const [value, setValue] = useState("");
  const inputs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

  const handleKeyPress = (nativeEvent, index) => {
    if (nativeEvent.key === "Backspace") {
      setValue(value.slice(0, -1));
      (inputs[index - 1]?.current as TextInput)?.focus();
    }
  };

  useEffect(() => {
    if (value.length < 4) {
      (inputs[value.length].current as TextInput)?.focus();
    }
    if (value.length === 4) {
      onComplete(value);
    }
    console.log(value);
  }, [value]);

  useEffect(() => {
    (inputs[0].current as TextInput)?.focus();
  }, []);

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map(i => (
        <Input
          key={i}
          value={parseText(value?.[i])}
          keyboardType="number-pad"
          ref={inputs[i] as Ref<TextInput>}
          onChangeText={t => setValue(parseText(value + t))}
          containerStyle={styles.inputContainerStyle}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, i)}
          inputStyle={[styles.input, styles.getActiveInputStyle(theme, value.length === i)]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    display: "flex",
    flexDirection: "row-reverse",
  },
  inputContainerStyle: { width: 60 },
  input: { textAlign: "center", width: 60 },
  getActiveInputStyle: (theme, isActive) => ({
    borderColor: isActive ? theme.colors.secondary : theme.colors.grey2,
    borderWidth: 1,
    outline: theme.colors.secondary,
  }),
});

export default OtpInput;
