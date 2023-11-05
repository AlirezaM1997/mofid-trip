import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import useProjectTable from "@src/hooks/db/project";
import { ProjectQueryType } from "@src/gql/generated";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import HostCard from "@modules/host-card";

function HostList() {
  const [list, setList] = useState<ProjectQueryType[]>();
  const { search, syncTable } = useProjectTable();
  const { tr } = useTranslation();

  useEffect(() => {
    syncTable({
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
    const res = search({
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    });
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
            <HostCard
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
    paddingHorizontal: 24,
  },
});

export default HostList;
