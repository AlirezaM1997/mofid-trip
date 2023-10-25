import React from "react"
import Text from "@src/components/atoms/text"
import WhiteSpace from "@src/components/atoms/white-space"
import { Image, Platform, StyleSheet, View } from "react-native"
import useTranslation from "@src/hooks/translation"

const NoResult = () => {
  const { tr } = useTranslation()
  return (
    <View style={style.container}>
      {Platform.OS === "android" ? (
        <Image source={require("../../../../assets/image/no-result.jpg")} />
      ) : (
        <Image source={require("../../../../assets/image/no-result.jpg")} />
      )}
      <WhiteSpace size={10} />
      <Text variant="heading1" style={{ textAlign: "center" }}>
        {tr("No Result")}
      </Text>
      <Text variant="body2" style={{ textAlign: "center" }}>
        {tr("Click the button to Book Now and go through the process")}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default NoResult
