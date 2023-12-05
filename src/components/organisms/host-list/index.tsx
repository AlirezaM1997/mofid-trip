import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import useProjectTable from "@src/hooks/db/project";
import { ProjectQueryType, useProjectListQuery } from "@src/gql/generated";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import HostCard from "@modules/host/card";
import Container from "@atoms/container";
import { Text } from "@rneui/themed";

function HostList() {
  const { tr } = useTranslation();
  const { search } = useProjectTable();
  const [list, setList] = useState<ProjectQueryType[]>();
  const { loading, data } = useProjectListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 999,
      },
    },
  });

  if (loading) return <Text>Loading hosts...</Text>;

  return (
    <>
      <Container>
        <TitleWithAction
          title={tr("Available hosts")}
          actionTitle={tr("See All")}
          onActionPress={() => router.push("/search")}
        />
      </Container>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.gap}
        style={style.listContainer}>
        <View style={style.spacer}></View>
        {data.projectList.data?.map((project, index) => (
          <View key={index}>
            <HostCard
              id={project.id}
              name={project.name}
              price={project.price}
              address={project.accommodation.address}
              avatarS3={project.accommodation.avatarS3}
            />
          </View>
        ))}
        <View style={style.spacer}></View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  listContainer: {
    minHeight: 345,
    display: "flex",
    flexDirection: "row",
  },
  gap: { gap: 10 },
  spacer: { width: 15 },
});

export default HostList;
