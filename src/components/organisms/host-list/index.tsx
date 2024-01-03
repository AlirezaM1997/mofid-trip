import React from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import Container from "@atoms/container";
import { router } from "expo-router";
import { useProjectListQuery } from "@src/gql/generated";
import { ScrollView, View, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import HostCardForSlider from "@modules/host/card-for-slider";

function HostList() {
  const { tr } = useTranslation();
  const { loading, data } = useProjectListQuery({
    variables: {
      sort: {
        descending: true,
      },
      page: {
        pageNumber: 1,
        pageSize: 8,
      },
    },
  });

  if (data?.projectList?.data?.length)
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
                  <HostCardForSlider
                    id={project.id}
                    name={project.name}
                    price={(project.price * (100 - project.discount)) / 100}
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
  gap: { gap: 18 },
  spacer: { width: 7 },
});

export default HostList;
