import React from "react"
// import styles from "./scrool-title.module.css";
import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Pressable, StyleSheet } from "react-native"
import { useTheme } from "@rneui/themed"
import Text from "@src/components/atoms/text"
import useTranslation from "@src/hooks/translation"

const ScrollTitle = ({ titleText }: { titleText?: string }) => {
  const { tr } = useTranslation()
  const navigation = useNavigation()
  const theme = useTheme()
  const handleSeeAll = () => navigation.navigate("SearchScreen")

  const style = StyleSheet.create({
    container: {
      marginTop: 32,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: { textTransform: "capitalize", margin: 0 },
  })

  return (
    <View style={style.container}>
      <Text variant="heading1" style={style.title}>
        {titleText}
      </Text>
      <Pressable onPress={handleSeeAll}>
        <Text variant="body2" style={{ color: theme.theme.colors.primary }}>
          {tr("See All")}
        </Text>
      </Pressable>
    </View>
  )
}
export default ScrollTitle
