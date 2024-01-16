import React from "react";
import { Text } from "@rneui/themed";
import { router } from "expo-router";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import useTranslation from "@src/hooks/translation";
import { useTourListQuery } from "@src/gql/generated";
import TourSearchCard from "@modules/tour/card/search-card";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from "react-native";

const SearchTour = () => {
  const { tr } = useTranslation();
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, loading } = useTourListQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
  });

  if (!data || loading) return <ActivityIndicator />;

  if (!data?.tourList.data.length) return <Text center>{tr("nothing found")}</Text>;

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
