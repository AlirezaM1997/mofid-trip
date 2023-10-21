import React, { useEffect, useState } from "react"
import { Input, useTheme } from "@rneui/themed"
import { StyleSheet, View } from "react-native"

type OtpInputPropsType = {
  onComplete: () => void
}

const OtpInput = ({ onComplete }: OtpInputPropsType) => {
  const { theme } = useTheme()
  const [value, setValue] = useState("")
  const inputs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()]

  const handleKeyPress = (nativeEvent, index) => {
    if (nativeEvent.key === "Backspace") {
      setValue(value.slice(0, -1))
      inputs[index - 1]?.current?.focus()
    }
  }

  useEffect(() => {
    if (value.length < 4) {
      inputs[value.length].current?.focus()
    }
    if (value.length === 4) {
      onComplete(value)
    }
  }, [value])

  useEffect(() => {
    inputs[0].current?.focus()
  }, [])

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((i) => (
        <Input
          key={i}
          ref={inputs[i]}
          keyboardType="number-pad"
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent, i)}
          onChangeText={(t) => setValue(value + t)}
          containerStyle={styles.inputContainerStyle}
          inputStyle={[styles.input, styles.getActiveInputStyle(theme, value.length === i)]}
          value={value?.[i]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  inputContainerStyle: { width: 60 },
  input: { textAlign: "center", width: 60 },
  getActiveInputStyle: (theme, isActive) => ({ borderColor: isActive ? theme.colors.primary : theme.colors.grey2, borderWidth: 1 }),
})

export default OtpInput
