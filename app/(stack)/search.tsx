import { Button } from "@rneui/themed";
import { NetworkStatus } from "@apollo/client";
import { Divider, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import useProjectTable from "@src/hooks/db/project";
import useTranslation from "@src/hooks/translation";
import { ProjectListQuery } from "@src/gql/generated";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "@src/components/modules/search-bar";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import SelectedFilters from "@src/components/modules/selected-filters";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import HostCard from "@modules/host/card";
import { PAGE_SIZE } from "@src/settings";

const SearchScreen: React.FC = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<ProjectListQuery | undefined[]>([]);
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
    setPageNumber(1)
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
              <HostCard
                key={index}
                id={project.id}
                name={project.name}
                price={project.price}
                address={project.accommodation.address}
                avatarS3={project.accommodation.avatarS3}
              />
            ))}
            {list?.length && list?.length === pageNumber * PAGE_SIZE && (
              <Button type="outline" onPress={() => setPageNumber(pageNumber + 1)}>
                {tr("Fetch More")}
              </Button>
            )}
            {!list?.length ? <NoResult /> : ""}
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
