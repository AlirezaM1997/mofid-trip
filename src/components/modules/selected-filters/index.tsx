import { Text } from "@rneui/themed"
import { RootState } from "@src/store"
import { ScrollView, StyleSheet } from "react-native"
import { Pressable, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Feather } from "@expo/vector-icons"
import { setProjectSetArguments } from "@src/slice/project-slice"
import useTranslation from "@src/hooks/translation"
import useIsRtl from "@src/hooks/localization"

const SelectedFilters = () => {
  const isRtl = useIsRtl()
  const { tr } = useTranslation()
  const dispatch = useDispatch()
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleDelete = (key: "categories" | "gender") => {
    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          ...projectSetArguments.filter,
          [key]: [],
        },
      })
    )
  }

  return (
    <ScrollView horizontal contentContainerStyle={style.allBadgesContainer(isRtl)}>
      {Object.keys(projectSetArguments.filter).map((k, index) => {
        return (
          projectSetArguments.filter[k].length > 0 && (
            <View key={index} style={style.badgeContainer}>
              <Pressable onPress={() => handleDelete(k)}>
                <Feather name="x-circle" size={19} color="#ADAFAE" />
              </Pressable>
              <Text style={style.text}>{tr(k)} | </Text>
              <Text>{projectSetArguments.filter[k].map((i) => tr(i)).join(", ")}</Text>
            </View>
          )
        )
      })}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  allBadgesContainer: (isRtl) => ({
    gap: 10,
    marginRight: isRtl ? 20 : 10,
    marginLeft: isRtl ? 10 : 20,
  }),
  badgeContainer: {
    gap: 2,
    backgroundColor: "#F3F3F3",
    borderColor: "#DADADA",
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: { textTransform: "capitalize" },
})

export default SelectedFilters
