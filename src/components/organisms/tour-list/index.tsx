import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import { Skeleton } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import { AccommodationQueryType, useTourListQuery } from "@src/gql/generated";
import TourSliderCard from "@modules/tour/card/slider-card";

function TourList() {
  const { tr } = useTranslation();
  const { data, loading } = useTourListQuery({
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

  if (data?.tourList?.data?.length)
    return (
      <>
        <Container>
          <TitleWithAction
            title={tr("available tours")}
            actionTitle={tr("See All")}
            onActionPress={() => router.push("/tour-search")}
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
            : data.tourList.data?.map((tour, index) => (
                <View key={index}>
                  <TourSliderCard
                    key={index}
                    id={tour.id}
                    name={tour.title}
                    avatarS3={tour.avatarS3}
                    price={tour.packages?.[0]?.price}
                    address={
                      (tour?.destination as AccommodationQueryType)?.address || tr("No Address")
                    }
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
    maxHeight: 342,
    display: "flex",
    flexDirection: "row",
  },
  gap: { gap: 18 },
  spacer: { width: 7 },
});

export default TourList;
