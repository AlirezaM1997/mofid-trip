import { Button } from "@rneui/themed";
import HostCard from "@modules/host/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import { Divider, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "@src/components/modules/search-bar";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import SelectedFilters from "@src/components/modules/selected-filters";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { ProjectListQuery, useProjectListLazyQuery } from "@src/gql/generated";

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<ProjectListQuery[] | undefined[]>([]);
  const [_, { networkStatus }] = useProjectListLazyQuery({
    notifyOnNetworkStatusChange: false,
  });
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getResult = async () => {
      const { data } = await _({
        variables: {
          sort: {
            descending: false,
          },
          search: searchText,
          page: { pageNumber: 1, pageSize: 10 },
        },
      });
      return data?.projectList?.data;
    };

    getResult().then(res => {
      setList(res as []);
      setPageNumber(1);
    });
  }, [searchText]);

  useEffect(() => {
    if (pageNumber > 1) {
      const getResult = async () => {
        const { data } = await _({
          variables: {
            search: searchText,
            sort: {
              descending: false,
            },
            page: { pageNumber: pageNumber, pageSize: 10 },
          },
        });
        return data?.projectList?.data;
      };
      getResult().then(res => {
        setList(res as []);
        // setList([...list, ...res]);
      });
    }
  }, [pageNumber]);

  return (
    <>
      <SearchBar onChangeText={e => setSearchText(e)} value={searchText} />
      <Divider />
      <ScrollView
        refreshControl={<RefreshControl refreshing={networkStatus === NetworkStatus.refetch} />}>
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
                price={(project.price * (100 - project.discount)) / 100}
                address={project.accommodation.address}
                avatarS3={project.accommodation.avatarS3}
              />
            ))}
            {list?.length && list?.length === pageNumber * PAGE_SIZE ? (
              <Button type="outline" onPress={() => setPageNumber(pageNumber + 1)}>
                {tr("Fetch More")}
              </Button>
            ) : null}
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
