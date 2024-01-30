import React from "react";
import { router } from "expo-router";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { setCategory } from "@src/slice/filter-slice";
import { useDispatch, useSelector } from "react-redux";
import TitleWithAction from "@modules/title-with-action";
import SearchBar from "@src/components/modules/search-bar";
import SearchTourHorizontalList from "@organisms/search/tour/horizontalList";
import SearchHostHorizontalList from "@organisms/search/host/horizontalList";
import { useProjectListSearchQuery, useTourListSearchQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { filterSlice } = useSelector((state: RootState) => state);

  const { data: hostData, loading: hostLoading } = useProjectListSearchQuery({
    variables: filterSlice,
  });

  const { data: tourData, loading: tourLoading } = useTourListSearchQuery({
    variables: filterSlice,
  });

  const routerHandler = category => {
    router.push("/search-list");
    dispatch(setCategory(category));
  };

  return (
    <>
      <SearchBar />
      {filterSlice.search ? (
        <Container style={styles.container}>
          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => routerHandler("tour")}
              title={`${tr("all tours of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <SearchTourHorizontalList data={tourData} loading={tourLoading} />
          </View>

          <View>
            <TitleWithAction
              size="body2"
              actionTitle={tr("See All")}
              onActionPress={() => routerHandler("host")}
              title={`${tr("all hosts of")} ${filterSlice.search}`}
            />

            <WhiteSpace size={8} />
            <SearchHostHorizontalList data={hostData} loading={hostLoading} />
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
