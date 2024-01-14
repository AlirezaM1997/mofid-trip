import React from "react";
import { RootState } from "@src/store";
import { Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import HostSearchCard from "@modules/host/card/search-card";
import { useProjectListQuery } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

const SearchHost = () => {
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, loading } = useProjectListQuery({
    variables: filterSlice,
  });

  if (!data || loading) <LoadingIndicator />;

  if (!data?.projectList) return;

  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      {data?.projectList?.data.map(project => (
        <Pressable key={project.id} onPress={() => router.push(`host/${project.id}`)}>
          <HostSearchCard project={project} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { gap: 15, padding: 1 },
});

export default SearchHost;
