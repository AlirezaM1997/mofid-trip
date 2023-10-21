import React from "react"
// import style from "./style.module.css";

import Text from "@src/components/atoms/text"
import { Feather } from "@expo/vector-icons"
import { View, StyleSheet, Pressable } from "react-native"
import { Project_Category, useCategoryListQuery } from "@src/gql/generated"
import CategoryPlaceSkeleton from "@src/components/modules/category-place"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store"
import { setProjectSetArguments } from "@src/slice/project-slice"
import { capitalizeFLetter } from "@src/helper/extra"
import { useNavigation } from "@react-navigation/native"
import { Image } from "@rneui/themed"
import useIsRtl from "@src/hooks/localization"

function PlaceCategoryCard() {
  const isRtl = useIsRtl()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { data, loading } = useCategoryListQuery()
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleChange = (category) => {
    const k = category.name
    const { categories } = projectSetArguments.filter
    var newCategories = []
    if (projectSetArguments.filter.categories.includes(Project_Category[capitalizeFLetter(k)])) {
      newCategories = categories.filter((i) => i !== k)
    } else {
      newCategories = [...categories, Project_Category[capitalizeFLetter(k)]]
    }
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          ...projectSetArguments.filter,
          categories: newCategories,
        },
      })
    )
    navigation.navigate("SearchScreen")
  }

  if (!data || loading) return <CategoryPlaceSkeleton />

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.container}>
      <View style={style.freeSpace}></View>
      {data.categoryList.map((category, index) => (
        <Pressable key={index} style={style.card} onPress={() => handleChange(category)}>
          <View style={style.images}>
            {category.avatarS3.medium ? (
              <Image style={style.img} source={{ uri: category.avatarS3.medium }} PlaceholderContent={category.name} />
            ) : (
              <Feather name="image" size={40} color="black" />
            )}
            <Text>{category.displayName}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
  title: { textTransform: "capitalize", marginBottom: 12, marginTop: 32 },
  images: { marginRight: 8, alignItems: "center" },
  card: { display: "flex", flexDirection: "column", alignItems: "center" },
  img: { borderRadius: 12, marginBottom: 7, width: 87, height: 107 },
  freeSpace: {
    backgroundColor: "transparent",
    width: 20,
    height: 20,
  },
})

export default PlaceCategoryCard
