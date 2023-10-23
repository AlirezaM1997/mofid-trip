import React from "react"
import { RootState } from "src/store"
import { Skeleton } from "@rneui/themed"
import { useTagListQuery } from "@src/gql/generated"
import { useSelector, useDispatch } from "react-redux"
import { setProjectSetArguments } from "@src/slice/project-slice"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import Text from "@src/components/atoms/text"
import { useRouter } from "expo-router"

const TagIcon = ({ tag }) => {
  const obj = {
    TREND: <FontAwesome5 name="gripfire" size={24} color="black" />,
    FREE: <MaterialIcons name="celebration" size={24} color="black" />,
    NEW: <MaterialCommunityIcons name="label-percent-outline" size={24} color="black" />,
    ECONOMY: <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="black" />,
    LUXE: <MaterialCommunityIcons name="medal-outline" size={24} color="black" />,
    DISCOUNT: <MaterialCommunityIcons name="brightness-percent" size={24} color="black" />,
  }

  return <>{obj[tag.name]}</>
}

const Tags = () => {
  const { data, loading } = useTagListQuery()
  const dispatch = useDispatch()
  const router = useRouter()
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice)

  const handleClick = (tagName) => {
    const tags = [...projectSetArguments.filter.tags, tagName]

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

  if (!data || loading) {
    return (
      <View style={style.container}>
        <View style={style.rowContainer}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton width={100} height={50} key={i} style={style.skeletonBox} animation="wave" />
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={style.container}>
      <View style={style.rowContainer}>
        {data?.tagList?.map((tag, i) => (
          <TouchableOpacity key={i} onPress={() => handleClick(tag?.name)} style={style.badgeStyle}>
            <TagIcon tag={tag} />
            <Text>{tag?.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  badgeStyle: {
    gap: 5,
    padding: 5,
    height: 50,
    minWidth: 100,
    display: "flex",
    borderRadius: 24,
    marginVertical: 2,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eee",
    justifyContent: "center",
  },
  rowContainer: {
    gap: 12,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: -1,
    justifyContent: "center",
  },
  skeletonBox: {
    margin: 3,
    borderRadius: 24,
  },
})

export default Tags
