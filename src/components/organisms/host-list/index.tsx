import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import useProjectTable from "@src/hooks/db/project";
import { ProjectQueryType } from "@src/gql/generated";
import TitleWithAction from "@modules/title-with-action";
import PlaceCard from "@src/components/modules/place-card";
import { ScrollView, View, StyleSheet } from "react-native";

function HostList() {
  const [list, setList] = useState<ProjectQueryType[]>();
  const { search } = useProjectTable();
  const { tr } = useTranslation();

  useEffect(() => {
    const res = search({ page: {} });
    setList(res);
  }, []);

  return (
    <>
      <TitleWithAction
        title={tr("Available hosts")}
        actionTitle={tr("See All")}
        onActionPress={() => router.push("/search")}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        style={style.listContainer}>
        {list?.map((project, index) => (
          <View key={index}>
            <PlaceCard
              key={index}
              id={project.id}
              name={project.name}
              price={project.price}
              address={project.accommodation.address}
              avatarS3={project.accommodation.avatarS3}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  listContainer: {
    minHeight: 370,
    display: "flex",
    marginBottom: 30,
    flexDirection: "row",
    paddingHorizontal: 3,
  },
});

export default HostList;
