import HostCard from "@modules/host/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { useProjectListQuery } from "@src/gql/generated";
import { Button, Divider, useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import NoResult from "@src/components/organisms/no-result";
import React, { useEffect, useRef, useState } from "react";
import WhiteSpace from "@src/components/atoms/white-space";
import SearchBar from "@src/components/modules/search-bar";
import SelectedFilters from "@src/components/modules/selected-filters";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

const HostListScreen: React.FC = () => {
  const { theme } = useTheme();
  const pageNumber = useRef(1);
  const { tr } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, error, networkStatus, fetchMore, refetch } = useProjectListQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
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
          <Container style={styles.resultContainer}>
            {data?.projectList?.data?.map((project, index) => (
              <>
                <HostCard
                  key={index}
                  id={project.id}
                  name={project.name}
                  address={project.accommodation.address}
                  avatarS3={project.accommodation.avatarS3}
                  price={(project.price * (100 - project.discount)) / 100}
                />
                <Divider />
              </>
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

export default HostListScreen;
