import React, { useState } from "react"
import { Avatar, Icon, ListItem } from "@rneui/themed"
import { Feather } from "@expo/vector-icons"
import { Platform, StyleSheet, View } from "react-native"
import { Project_Category } from "@src/gql/generated"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store"
import { setProjectSetArguments } from "@src/slice/project-slice"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"

const FilterPlaceCategory = () => {
  const isRtl = useIsRtl()
  const dispatch = useDispatch()
  const { tr } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleChange = (k, v) => {
    const categories = projectSetArguments?.filter?.categories || []
    var newCategories = []
    if (projectSetArguments?.filter?.categories?.includes(v)) {
      newCategories = categories.filter((i) => i !== k)
    } else {
      newCategories = [...categories, k]
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
  }

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.label(isRtl)}>{tr("Place Category")}</ListItem.Title>
        </ListItem.Content>
      }
      icon={<Feather name="chevron-down" size={24} color="black" />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {Object.keys(Project_Category).map((k, index) => (
        <ListItem key={index} bottomDivider onPress={() => handleChange(k, Project_Category[k])}>
          <ListItem.Content>
            <View style={styles.row}>
              <ListItem.CheckBox checked={projectSetArguments.filter?.categories?.includes(k)} onPress={() => handleChange(k, Project_Category[k])} />
              <ListItem.Title style={styles.label(isRtl)}>{tr(Project_Category[k])}</ListItem.Title>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
    </ListItem.Accordion>
  )
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    ...Platform.select({
      web: {
        alignItems: "center",
      },
    }),
  },
  label: (isRtl) => ({
    fontFamily: isRtl ? "DanaNoEn" : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: "400",
  }),
})

export default FilterPlaceCategory
