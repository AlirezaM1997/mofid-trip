import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@src/components/modules/search-bar";
import { useProjectSetLazyQuery } from "@src/gql/generated";
import PlaceCard from "@src/components/modules/place-card";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { NetworkStatus } from "@apollo/client";
import Text from "@src/components/atoms/text";
import { StyleSheet } from "react-native";
import { Button, Divider } from "@rneui/themed";
import WhiteSpace from "@src/components/atoms/white-space";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import SelectedFilters from "@src/components/modules/selected-filters";
import useTranslation from "@src/hooks/translation";

const Search: React.FC = () => {
  const { tr } = useTranslation();
  const pageNumberRef = useRef(1);
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const { projectSetArguments } = useSelector((state: RootState) => state.projectSlice);
  const [search, { loading, data, networkStatus, fetchMore }] = useProjectSetLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchText(e);
  };

  useEffect(() => {
    search({
      variables: {
        search: searchText,
        page: {
          pageNumber: pageNumberRef.current,
          pageSize: 10,
        },
      },
    });
  }, [searchText]);

  useEffect(() => {
    search({
      variables: projectSetArguments,
    });
  }, [projectSetArguments]);

  useEffect(() => {
    if (!loading && data?.projectSet?.data?.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [loading, data]);

  const handleFetchMore = () => {
    const pageCount = data?.projectSet?.pageCount;
    if (pageNumberRef.current < pageCount) {
      pageNumberRef.current = pageNumberRef.current + 1;
      fetchMore({
        variables: {
          ...projectSetArguments,
          page: {
            ...projectSetArguments.page,
            pageNumber: pageNumberRef.current,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          return {
            ...prev,
            projectSet: {
              ...prev.projectSet,
              data: [...prev.projectSet.data, ...fetchMoreResult.projectSet.data],
            },
          };
        },
      });
    }
  };

  return (
    <>
      <SearchBar onChangeText={handleChange} value={searchText} />
      <Divider />
      <ScrollView>
        <WhiteSpace size={10} />
        <SelectedFilters />
        <WhiteSpace size={10} />

        <Container size={25} style={styles.resultContainer}>
          {networkStatus === NetworkStatus.loading ? (
            <Text>SKELETON</Text>
          ) : noResults ? (
            <Text>No Item Found</Text>
          ) : (
            data?.projectSet.data?.map((project, index) => <PlaceCard key={index} project={project} />)
          )}
          <Button
            title={
              pageNumberRef.current === data?.projectSet?.pageCount
                ? tr("No More Data")
                : networkStatus === NetworkStatus.fetchMore
                ? tr("Loading ...")
                : tr("Fetch More")
            }
            type="clear"
            onPress={handleFetchMore}
            disabled={networkStatus === NetworkStatus.fetchMore || pageNumberRef.current === data?.projectSet?.pageCount}
          />
        </Container>

        <WhiteSpace size={20} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default Search;
