import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import SearchHost from "@modules/search/host";
import SearchTour from "@modules/search/tour";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import TitleWithAction from "@modules/title-with-action";
import SearchBar from "@src/components/modules/search-bar";
import { useProjectListSearchQuery, useTourListSearchQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const { tr } = useTranslation();
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data: hostData, loading: hostLoading } = useProjectListSearchQuery({
    variables: filterSlice,
  });

  const { data: tourData, loading: tourLoading } = useTourListSearchQuery({
    variables: filterSlice,
  });

  return (
    <>
      <SearchBar />
      {filterSlice.search ? (
        <Container style={styles.container}>
          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/tour-list")}
              title={`${tr("all tours of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <SearchTour data={tourData} loading={tourLoading} />
          </View>

          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => router.push("/host-list")}
              title={`${tr("all hosts of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <SearchHost data={hostData} loading={hostLoading} />
          </View>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { gap: 24 },
});

export default SearchScreen;
