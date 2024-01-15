import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { useTourListQuery } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import TourSearchCard from "@modules/tour/card/search-card";
import { Pressable, ScrollView, StyleSheet } from "react-native";

const SearchTour = () => {
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, loading } = useTourListQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
  });

  if (!data || loading) <LoadingIndicator />;

  if (!data?.tourList) return;

  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      {data?.tourList?.data.map(tour => (
        <Pressable key={tour.id} onPress={() => router.push(`tour/${tour.id}`)}>
          <TourSearchCard tour={tour} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { gap: 15, padding: 1 },
});

export default SearchTour;
