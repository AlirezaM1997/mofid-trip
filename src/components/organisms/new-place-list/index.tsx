import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PlaceCard from "@src/components/modules/place-card";
import { ScrollView } from "react-native-gesture-handler";
import { ProjectQueryType, Tag } from "@src/gql/generated";
import useProjectTable from "@src/hooks/db/project";

function NewPlaceList() {
  const [list, setList] = useState<ProjectQueryType[]>();
  const { search } = useProjectTable();

  useEffect(() => {
    const res = search({ filter: { tags: [Tag.New] } });
    setList(res);
  }, []);

  return (
    <View style={style.container}>
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
    </View>
  );
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
});

export default NewPlaceList;
