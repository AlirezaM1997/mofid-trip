import React from "react"
import { StyleSheet } from "react-native"
import Text from "../text"
import { useTheme } from "@rneui/themed"

const WebInput = ({ label, errorMessage, containerStyle, ...props }) => {
  const { theme } = useTheme()
  return (
    <div style={{...containerStyle, ...styles.root}}>
      {label && <Text variant="body1">{label}</Text>}
      <input {...props} style={{ ...styles.input, ...props.style }} />
      {errorMessage && <Text color={theme.colors.error}>{errorMessage}</Text>}
    </div>
  )
}

const styles = StyleSheet.create({
  root: { display: "flex", flexDirection: "column", gap: 3 },
  input: { padding: 15, borderRadius: 12 },
})

WebInput.defaultProps = {
  containerStyle: {},
}

export default WebInput
