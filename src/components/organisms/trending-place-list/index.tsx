import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlaceCard from "@src/components/modules/place-card";
import { Tag, ProjectQueryType } from "@src/gql/generated";
import { ScrollView } from "react-native-gesture-handler";
import useProjectTable from "@src/hooks/db/project";

function TrendingPlaceList() {
  const { search } = useProjectTable();
  const [list, setList] = useState<ProjectQueryType[]>();

  useEffect(() => {
    const res = search({ filter: { tags: [Tag.Trend] } });
    setList(res);
  }, []);

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={style.contentContainerStyle}>
        <View style={style.freeSpace}></View>
        {list?.map((project, index) => (
          <View key={index}>
            <PlaceCard project={project} />
          </View>
        ))}
        <View style={style.freeSpace}></View>
      </ScrollView>
    </>
  );
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
});

export default TrendingPlaceList;
