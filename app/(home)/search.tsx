import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@src/components/modules/search-bar";
import PlaceCard from "@src/components/modules/place-card";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { NetworkStatus } from "@apollo/client";
import Text from "@src/components/atoms/text";
import { Pressable, RefreshControl, StyleSheet, View } from "react-native";
import { Button, Divider } from "@rneui/themed";
import WhiteSpace from "@src/components/atoms/white-space";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import SelectedFilters from "@src/components/modules/selected-filters";
import useTranslation from "@src/hooks/translation";
import NoResult from "@src/components/organisms/no-result";
import useProjectTable from "@src/hooks/db/project";

const SearchScreen: React.FC = () => {
  const { tr } = useTranslation();
  // const pageNumberRef = useRef(1)
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);
  // const [noResults, setNoResults] = useState(false)
  const { projectSetArguments } = useSelector(
    (state: RootState) => state.projectSlice
  );
  // const [search, { loading, data, networkStatus, fetchMore }] = useProjectListLazyQuery({
  //   notifyOnNetworkStatusChange: true,
  // })
  const { data } = useSelector(
    (state: RootState) => state.projectSlice.projectSet
  );
  const { search, syncTable, networkStatus } = useProjectTable();

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
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
    setList(search(searchText));
  }, [searchText]);

  // useEffect(() => {
  //   search({
  //     variables: {
  //       search: searchText,
  //       page: {
  //         pageNumber: pageNumberRef.current,
  //         pageSize: 10,
  //       },
  //     },
  //   })
  // }, [searchText])

  // useEffect(() => {
  //   search({
  //     variables: projectSetArguments,
  //   })
  // }, [projectSetArguments])

  // useEffect(() => {
  //   if (!loading && data?.projectSet?.data?.length === 0) {
  //     setNoResults(true)
  //   } else {
  //     setNoResults(false)
  //   }
  // }, [loading, data])

  // const handleFetchMore = () => {
  //   const pageCount = data?.projectSet?.pageCount
  //   if (pageNumberRef.current < pageCount) {
  //     pageNumberRef.current = pageNumberRef.current + 1
  //     fetchMore({
  //       variables: {
  //         ...projectSetArguments,
  //         page: {
  //           ...projectSetArguments.page,
  //           pageNumber: pageNumberRef.current,
  //         },
  //       },
  //       updateQuery: (prev, { fetchMoreResult }) => {
  //         return {
  //           ...prev,
  //           projectSet: {
  //             ...prev.projectSet,
  //             data: [...prev.projectSet.data, ...fetchMoreResult.projectSet.data],
  //           },
  //         }
  //       },
  //     })
  //   }
  // }

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
        }
      >
        <WhiteSpace size={10} />
        <SelectedFilters />
        <WhiteSpace size={10} />

        <Container size={25} style={styles.resultContainer}>
          {list?.map((project, index) => (
            <PlaceCard key={index} project={project} />
          ))}
          {!list.length && <NoResult />}
          {/* {networkStatus !== NetworkStatus.ready ? (
            <Text>SKELETON</Text>
          ) : data?.projectSet?.data?.length ? (
            data?.projectSet.data?.map((project, index) => <PlaceCard key={index} project={project} />)
          ) : (
            <NoResult />
          )}
          {data?.projectSet?.data?.length ? (
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
          ) : null} */}
        </Container>

        <WhiteSpace size={20} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default SearchScreen;
