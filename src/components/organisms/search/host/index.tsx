import React from "react";
import { router } from "expo-router";
import { Text } from "@rneui/themed";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import useTranslation from "@src/hooks/translation";
import { useProjectListQuery } from "@src/gql/generated";
import { ScrollView } from "react-native-gesture-handler";
import HostSearchCard from "@modules/host/card/search-card";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

const SearchHost = () => {
  const { tr } = useTranslation();
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, loading } = useProjectListQuery({
    variables: filterSlice,
  });

  if (!data || loading) return <ActivityIndicator />;

  if (!data?.projectList.data.length) return <Text center>{tr("nothing found")}</Text>;

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
