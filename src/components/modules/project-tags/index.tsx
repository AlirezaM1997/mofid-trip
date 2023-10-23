import { useNavigation } from "@react-navigation/native"
import Text from "@src/components/atoms/text"
import { Project_Category } from "@src/gql/generated"
import { capitalizeFLetter } from "@src/helper/extra"
import { setProjectSetArguments } from "@src/slice/project-slice"
import { RootState } from "@src/store"
import { PRIMARY_COLOR } from "@src/theme"
import { useRouter } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

const Tag = ({ name }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleChange = (name) => {
    const tags = [...projectSetArguments.filter.tags, name]

    dispatch(
      setProjectSetArguments({
        ...projectSetArguments,
        filter: {
          ...projectSetArguments.filter,
          tags: [...new Set(tags)],
        },
      })
    )
    router.push('/search')
  }

  return (
    <Pressable style={style.tagContainer} onPress={() => handleChange(name)}>
      <Text style={style.text}>{name}</Text>
    </Pressable>
  )
}

const ProjectTags = () => {
  const { tags } = useSelector((state: RootState) => state?.projectSlice?.projectDetail)

  return (
    <View style={style.container}>
      {tags.map((tag, index) => (
        <Tag key={index} name={tag.name} />
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  tagContainer: {
    backgroundColor: "#FFF0EF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  text: {
    color: PRIMARY_COLOR,
  },
})

export default ProjectTags
