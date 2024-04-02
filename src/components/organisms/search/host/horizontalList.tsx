import React from "react";
import { router } from "expo-router";
import { Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ScrollView } from "react-native-gesture-handler";
import HostSearchCard from "@modules/host/card/search-card";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { ProjectListSearchQuery } from "@src/gql/generated";

const SearchHostHorizontalList = ({ data, loading }: { data: ProjectListSearchQuery | undefined, loading: boolean }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  if (!data || loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  if (!data?.projectList?.data?.length) return <Text center>{tr("nothing found")}</Text>;

  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      {data?.projectList?.data.map(project => (
        <Pressable
          style={styles.card}
          key={project?.id}
          onPress={() => router.push(`host/${project?.id}/`)}>
          <HostSearchCard project={project} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { gap: 15, padding: 1, paddingHorizontal: 24 },
  card: { width: 226 },
});

export default SearchHostHorizontalList;
