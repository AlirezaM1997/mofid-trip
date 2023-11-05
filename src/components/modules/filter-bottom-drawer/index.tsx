import { BottomSheet } from "@rneui/themed"
import React from "react"
import FilterPlaceCategory from "../filter/place-category"
import { Pressable, StyleSheet, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Text } from "@rneui/themed"
import FilterTags from "../filter/tags"
import FilterGender from "../filter/gender"
import useTranslation from "@src/hooks/translation"

const FilterBottomDrawer = ({ isVisible, setIsVisible }) => {
  const { tr } = useTranslation()

  return (
    <BottomSheet containerStyle={styles.containerStyle} isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Pressable style={styles.closer} onPress={() => setIsVisible(false)}>
        <Feather name="x-circle" size={24} color="transparent" />
        <Text variant="heading1">{tr("Filter")}</Text>
        <Feather name="x-circle" size={24} color="black" />
      </Pressable>
      <FilterPlaceCategory />
      <FilterTags />
      <FilterGender />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  closer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  containerStyle: {
    ...Platform.select({
      web: { maxHeight: "100vh", overflow: "scroll" },
    }),
  },
})

export default FilterBottomDrawer
