import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import PlaceCard from "@src/components/modules/place-card"
import { ScrollView } from "react-native-gesture-handler"
import { Tag, useProjectSetLazyQuery } from "@src/gql/generated"
import PlaceCardSkeleton from "@src/components/modules/place-card-skeleton"
import useIsRtl from "@src/hooks/localization"

function NewPlaceList() {
  const isRtl = useIsRtl()
  const [search, { loading, data }] = useProjectSetLazyQuery({
    variables: {
      search: "",
      filter: { tags: [Tag.New] },
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    },
  })

  useEffect(() => {
    search()
  }, [search, data])

  if (loading || !data) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        <View style={style.freeSpace}></View>
        {[1, 2, 3, 4, 5].map((a, index) => (
          <View key={index}>
            <PlaceCardSkeleton key={index} />
          </View>
        ))}
        <View style={style.freeSpace}></View>
      </ScrollView>
    )
  }

  return (
    <View style={style.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={style.contentContainerStyle}>
        <View style={style.freeSpace}></View>
        {data?.projectSet?.data.map((project, index) => (
          <View key={index}>
            <PlaceCard project={project} />
          </View>
        ))}
        <View style={style.freeSpace}></View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: 370,
  },
  contentContainerStyle: { gap: 10 },
  freeSpace: {
    backgroundColor: "transparent",
    width: 15,
    height: 15,
  },
})

export default NewPlaceList
