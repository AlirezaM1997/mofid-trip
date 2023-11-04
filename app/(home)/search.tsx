import React, { useEffect, useState } from "react";
import SearchBar from "@src/components/modules/search-bar";
import PlaceCard from "@src/components/modules/place-card";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { NetworkStatus } from "@apollo/client";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { Divider, useTheme } from "@rneui/themed";
import WhiteSpace from "@src/components/atoms/white-space";
import SelectedFilters from "@src/components/modules/selected-filters";
import NoResult from "@src/components/organisms/no-result";
import useProjectTable from "@src/hooks/db/project";
import { ProjectListQueryResult } from "@src/gql/generated";
import { Button } from "@rneui/themed";

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<ProjectListQueryResult["data"]["projectList"] | undefined[]>([]);
  const { search, syncTable, networkStatus } = useProjectTable();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchText(e);
  };

  const onRefresh = () => {
    syncTable({
      page: {
        pageNumber: 1,
        pageSize: 99999998,
      },
    });
  };

  useEffect(() => {
    const res = search({ search: searchText, page: { pageNumber: 1, pageSize: 10 } });
    setList(res);
  }, [searchText]);

  useEffect(() => {
    const res = search({ search: searchText, page: { pageNumber: pageNumber, pageSize: 10 } });
    setList([...list, ...res]);
  }, [pageNumber]);

  return (
    <>
      <SearchBar onChangeText={handleChange} value={searchText} />
      <Divider />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === NetworkStatus.refetch}
            onRefresh={onRefresh}
          />
        }>
        <WhiteSpace size={10} />
        <SelectedFilters />
        <WhiteSpace size={10} />

        {networkStatus !== NetworkStatus.ready ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Container size={25} style={styles.resultContainer}>
            {list?.map((project, index) => (
              <PlaceCard
                key={index}
                id={project.id}
                name={project.name}
                price={project.price}
                address={project.accommodation.address}
                avatarS3={project.accommodation.avatarS3}
              />
            ))}
            {list?.length ? (
              <Button type="outline" onPress={() => setPageNumber(pageNumber + 1)}>
                Fetch More
              </Button>
            ) : (
              <NoResult />
            )}
          </Container>
        )}

        <WhiteSpace size={20} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default SearchScreen;
