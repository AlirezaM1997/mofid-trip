import React from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import HostCard from "@modules/host/card";
import Container from "@atoms/container";
import { router } from "expo-router";
import { useProjectListQuery } from "@src/gql/generated";
import { ScrollView, View, StyleSheet } from "react-native";
import { Skeleton, Text } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";

function HostList() {
  const { tr } = useTranslation();
  const { loading, data } = useProjectListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 8,
      },
    },
  });

  return (
    <>
      <Container>
        <TitleWithAction
          title={tr("Available hosts")}
          actionTitle={tr("See All")}
          onActionPress={() => router.push("/search")}
        />
      </Container>

      <WhiteSpace size={16} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.gap}
        style={style.listContainer}>
        <View style={style.spacer}></View>
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton
                key={i}
                animation="pulse"
                width={328}
                height={300}
                style={{ borderRadius: 10 }}
              />
            ))
          : data.projectList.data?.map((project, index) => (
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
