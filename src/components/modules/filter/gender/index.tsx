import React, { useState } from "react"
import { ListItem } from "@rneui/themed"
import { Platform, StyleSheet, View } from "react-native"
import { ProjectGenderEnum } from "@src/gql/generated"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/store"
import { setProjectSetArguments } from "@src/slice/project-slice"
import { Feather } from "@expo/vector-icons"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"

const FilterGender = () => {
  const isRtl = useIsRtl()
  const { tr } = useTranslation()
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleChange = (k, v) => {
    const gender = projectSetArguments?.filter?.gender || []
    var newGenders = []
    if (projectSetArguments?.filter?.gender?.includes(v)) {
      newGenders = gender.filter((i) => i !== v)
    } else {
      newGenders = [...gender, v]
    }
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          ...projectSetArguments.filter,
          gender: newGenders,
        },
      })
    )
  }

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.label(isRtl)}>{tr("Gender")}</ListItem.Title>
        </ListItem.Content>
      }
      icon={<Feather name="chevron-down" size={24} color="black" />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {Object.keys(ProjectGenderEnum).map((k, index) => (
        <ListItem key={index} bottomDivider onPress={() => handleChange(k, ProjectGenderEnum[k])}>
          <ListItem.Content>
            <View style={styles.row}>
              <ListItem.CheckBox checked={projectSetArguments.filter?.gender?.includes(ProjectGenderEnum[k])} onPress={() => handleChange(k, ProjectGenderEnum[k])} />
              <ListItem.Title style={styles.label(isRtl)}>{tr(ProjectGenderEnum[k])}</ListItem.Title>
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
  })
})

export default FilterGender
