import { Button } from "@rneui/themed";
import HostCard from "@modules/host/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import { Divider, useTheme } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "@src/components/modules/search-bar";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import SelectedFilters from "@src/components/modules/selected-filters";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { ProjectListQuery, useProjectListLazyQuery, useProjectListQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const pageNumber = useRef(1);
  const { data, error, networkStatus, fetchMore, refetch } = useProjectListQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      sort: {
        descending: false,
      },
      search: searchText,
      page: { pageNumber: 1, pageSize: PAGE_SIZE },
    },
  });

  const handleLoadMore = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchMore({
      variables: {
        sort: {
          descending: false,
        },
        search: searchText,
        page: { pageNumber: pageNumber.current, pageSize: PAGE_SIZE },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          projectList: {
            ...prev.projectList,
            data: [...prev.projectList.data, ...fetchMoreResult.projectList.data],
          },
        };
      },
    });
  };

  useEffect(() => {
    pageNumber.current = 1;
    refetch({
      sort: {
        descending: false,
      },
      search: searchText,
      page: { pageNumber: pageNumber.current, pageSize: PAGE_SIZE },
    });
  }, [searchText]);

  if (error) return <p>Error: {error?.message}</p>;

  return (
    <>
      <SearchBar onChangeText={e => setSearchText(e)} value={searchText} />
      <Divider />
      <ScrollView
        refreshControl={<RefreshControl refreshing={networkStatus === NetworkStatus.refetch} />}>
        <WhiteSpace size={10} />
        <SelectedFilters />
        <WhiteSpace size={10} />

        {networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Container size={25} style={styles.resultContainer}>
            {data?.projectList?.data?.map((project, index) => (
              <HostCard
                key={index}
                id={project.id}
                name={project.name}
                price={(project.price * (100 - project.discount)) / 100}
                address={project.accommodation.address}
                avatarS3={project.accommodation.avatarS3}
              />
            ))}
            {data?.projectList?.data?.length &&
            data?.projectList?.data?.length === pageNumber.current * PAGE_SIZE ? (
              <Button
                type="outline"
                onPress={handleLoadMore}
                disabled={networkStatus === NetworkStatus.refetch}
                loading={networkStatus === NetworkStatus.refetch}>
                {tr("Fetch More")}
              </Button>
            ) : null}
            {networkStatus === NetworkStatus.ready && !data?.projectList?.data?.length ? (
              <NoResult />
            ) : (
              ""
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
