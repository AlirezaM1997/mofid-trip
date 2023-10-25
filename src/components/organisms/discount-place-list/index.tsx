import React, { useEffect, useState } from "react";
import PlaceCard from "@src/components/modules/place-card";
import { ScrollView, View, StyleSheet } from "react-native";
import { ProjectQueryType, Tag } from "@src/gql/generated";
import useProjectTable from "@src/hooks/db/project";

function DiscountPlaceList() {
  const [list, setList] = useState<ProjectQueryType[]>();
  const { search } = useProjectTable();

  useEffect(() => {
    const res = search({ filter: { tags: [Tag.Discount] } });
    setList(res);
  }, [search]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      style={style.container}>
      <View style={style.freeSpace}></View>
      {list?.map((project, index) => (
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
