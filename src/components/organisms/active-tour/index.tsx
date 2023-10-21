import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ActiveTourCard from "@src/components/modules/active-tour-card";
import SuggestionPlaceCardSkeleton from "@src/components/modules/suggestion-place-card-skeleton";
import { TourTypes, useTourListQuery } from "@src/gql/generated";

const ActiveTourList = () => {
  const { loading, data } = useTourListQuery({
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 10,
      },
    },
  });

  const style = StyleSheet.create({
    suggestions: {
      display: "flex",
      paddingLeft: 16,
      gap: 10,
    },
  });

  if (loading || !data) return <SuggestionPlaceCardSkeleton />;

  return (
    <ScrollView
      horizontal
      style={style.suggestions}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
    >
      {data?.tourList?.data?.map((tour, index) => (
        <ActiveTourCard key={index} tour={tour as TourTypes} />
      ))}
    </ScrollView>
  );
};

export default ActiveTourList;
