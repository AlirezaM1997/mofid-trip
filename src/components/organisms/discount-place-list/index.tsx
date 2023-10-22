import React, { useEffect } from "react";
import PlaceCard from "@src/components/modules/place-card";
import { ScrollView, View, StyleSheet } from "react-native";
import { Tag, useProjectSetLazyQuery } from "@src/gql/generated";
import PlaceCardSkeleton from "@src/components/modules/place-card-skeleton";

function DiscountPlaceList() {
  const [search, { loading, data }] = useProjectSetLazyQuery({
    variables: {
      search: "",
      filter: { tags: [Tag.Discount] },
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    search();
  }, [search, data]);

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
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={style.container}>
      <View style={style.freeSpace}></View>
      {data.projectSet?.data.map((project, index) => (
        <View key={index}>
          <PlaceCard key={index} project={project} />
        </View>
      ))}
      <View style={style.freeSpace}></View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 30,
    flexDirection: "row",
    minHeight: 370,
  },
  freeSpace: {
    backgroundColor: "transparent",
    width: 15,
    height: 15,
  },
});

export default DiscountPlaceList;
