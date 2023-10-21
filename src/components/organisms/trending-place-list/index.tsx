import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import PlaceCard from "@src/components/modules/place-card"
import { useProjectSetLazyQuery, Tag } from "@src/gql/generated"
import PlaceCardSkeleton from "@src/components/modules/place-card-skeleton"
import { ScrollView } from "react-native-gesture-handler"
import useIsRtl from "@src/hooks/localization"
import WhiteSpace from "@src/components/atoms/white-space"

function TrendingPlaceList() {
  const isRtl = useIsRtl()
  const [search, { loading, data }] = useProjectSetLazyQuery({
    variables: {
      search: "",
      filter: { tags: [Tag.Trend] },
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
    <>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={style.contentContainerStyle}>
        <View style={style.freeSpace}></View>
        {data?.projectSet?.data.map((project, index) => (
          <View key={index}>
            <PlaceCard project={project} />
          </View>
        ))}
        <View style={style.freeSpace}></View>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  contentContainerStyle: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    gap: 10,
  },
  freeSpace: {
    backgroundColor: "transparent",
    width: 15,
    height: 15,
  },
})

export default TrendingPlaceList
