import React from "react";
import { router } from "expo-router";
import { Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import TourSearchCard from "@modules/tour/card/search-card";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from "react-native";

const SearchTourHorizontalList = ({ data, loading }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  if (!data || loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  if (!data?.tourList.data.length) return <Text center>{tr("nothing found")}</Text>;

  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      {data?.tourList?.data.map(tour => (
        <Pressable key={tour.id} style={styles.card} onPress={() => router.push(`tour/${tour.id}`)}>
          <TourSearchCard tour={tour} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: { width: 226 },
  contentContainerStyle: { gap: 15, padding: 1 },
});

export default SearchTourHorizontalList;
