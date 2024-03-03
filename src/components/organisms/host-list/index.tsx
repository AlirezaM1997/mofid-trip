import React from "react";
import { router } from "expo-router";
import { Skeleton } from "@rneui/themed";
import Container from "@atoms/container";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import HostSliderCard from "@modules/host/card/slider-card";
import { RateType, SortFieldEnum, useProjectListQuery } from "@src/gql/generated";

function HostList() {
  const { tr } = useTranslation();
  const { loading, data } = useProjectListQuery({
    variables: {
      sort: {
        descending: true,
        fieldName: SortFieldEnum.ModifiedDate,
      },
      page: {
        pageSize: 8,
        pageNumber: 1,
      },
    },
  });

  if (data?.projectList?.data?.length)
    return (
      <View style={style.gap}>
        <Container>
          <TitleWithAction
            title={tr("Available hosts")}
            actionTitle={tr("See All")}
            onActionPress={() => router.push("/mahdieh-iran")}
          />
        </Container>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.scrollView}
          style={style.listContainer}>
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
                  <HostSliderCard
                    id={project?.id as string}
                    name={project?.name}
                    rate={project?.rate as RateType}
                    price={
                      ((project?.price as number) * (100 - (project?.discount as number))) / 100
                    }
                    address={project?.accommodation?.address}
                    avatarS3={project?.accommodation?.avatarS3}
                  />
                </View>
              ))}
        </ScrollView>
      </View>
    );
}

const style = StyleSheet.create({
  listContainer: {
    maxHeight: 345,
    display: "flex",
    flexDirection: "row",
  },
  scrollView: { gap: 20, paddingHorizontal: 24 },
  gap: { gap: 16 },
});

export default HostList;
