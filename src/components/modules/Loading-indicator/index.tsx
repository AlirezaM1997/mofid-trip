import React from "react"
import { Text } from "@rneui/themed"
import { PRIMARY_COLOR } from "@src/theme"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import useTranslation from "@src/hooks/translation"
import WhiteSpace from "@src/components/atoms/white-space"

const LoadingIndicator = () => {
  const { tr } = useTranslation()

  return (
    <View style={style.loadingContainer}>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      <WhiteSpace size={10} />
      <Text style={{ textAlign: "center" }}>{tr("Loading ...")}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
})

export default LoadingIndicator
