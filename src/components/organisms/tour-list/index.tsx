import { router } from "expo-router";
import TourCard from "@modules/tour/card";
import React from "react";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView, View, StyleSheet } from "react-native";
import { AccommodationQueryType, useTourListQuery } from "@src/gql/generated";
import Container from "@atoms/container";
import { Text } from "@rneui/themed";

function TourList() {
  const { tr } = useTranslation();
  const { data, loading } = useTourListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 9999,
      },
    },
  });

  if (loading) return <Text>Loading Tours...</Text>;

  return (
    <>
      <Container>
        <TitleWithAction
          title={tr("available tours")}
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
        {data.tourList.data?.map((tour, index) => (
          <View key={index}>
            <TourCard
              key={index}
              id={tour.id}
              name={tour.title}
              avatarS3={tour.avatarS3}
              price={tour.packages?.[0]?.price}
              address={(tour?.destination as AccommodationQueryType)?.address || tr("No Address")}
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
    minHeight: 370,
    display: "flex",
    flexDirection: "row",
  },
  gap: { gap: 10 },
  spacer: { width: 15 },
});

export default TourList;
