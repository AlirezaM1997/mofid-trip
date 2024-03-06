import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import { Skeleton } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import TourSliderCard from "@modules/tour/card/slider-card";
import { ScrollView, View, StyleSheet } from "react-native";
import { AccommodationQueryType, TourImageType, useTourListQuery } from "@src/gql/generated";

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
      <View style={style.gap}>
        <Container>
          <TitleWithAction
            title={tr("available tours")}
            actionTitle={tr("See All")}
            onActionPress={() => router.push("/all-tours")}
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
            : data.tourList.data?.map((tour, index) => (
                <View key={index}>
                  <TourSliderCard
                    key={index}
                    id={tour?.id as string}
                    name={tour?.title as string}
                    avatarS3={tour?.avatarS3 as TourImageType[]}
                    price={tour?.packages?.[0]?.price as number}
                    discount={tour?.packages?.[0]?.discount as number}
                    address={
                      (tour?.destination as AccommodationQueryType)?.address || tr("No Address")
                    }
                  />
                </View>
              ))}
        </ScrollView>
      </View>
    );
}

const style = StyleSheet.create({
  listContainer: {
    maxHeight: 342,
    display: "flex",
    flexDirection: "row",
  },
  scrollView: { gap: 20, paddingHorizontal: 24 },
  gap: { gap: 16 },
});

export default TourList;
