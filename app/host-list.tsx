import React, { useRef } from "react";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import HostCard from "@modules/host/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { useProjectListQuery } from "@src/gql/generated";
import { Button, Divider, useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import NoResult from "@src/components/organisms/no-result";
import WhiteSpace from "@src/components/atoms/white-space";
import SearchBar from "@src/components/modules/search-bar";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import LoadingIndicator from "@modules/Loading-indicator";
import TitleWithAction from "@modules/title-with-action";

const HostListScreen: React.FC = () => {
  const { theme } = useTheme();
  const pageNumber = useRef(1);
  const { tr } = useTranslation();

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, error, networkStatus, fetchMore } = useProjectListQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
  });

  const handleLoadMore = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchMore({
      variables: { ...filterSlice, page: { ...filterSlice.page, pageNumber: pageNumber.current } },
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

  if (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch)
    return <LoadingIndicator />;

  if (networkStatus === NetworkStatus.ready && !data?.projectList?.data?.length)
    return <NoResult />;

  return (
    <>
      <SearchBar />
      <Divider />

      <ScrollView
        refreshControl={<RefreshControl refreshing={networkStatus === NetworkStatus.refetch} />}>
        <Container>
          <WhiteSpace size={24} />
          <TitleWithAction
            size="caption"
            color="grey3"
            title={`${tr("all hosts of")} ${filterSlice.search}`}
            actionTitle={`${data?.projectList?.count.toString()} ${tr("host")}`}
          />
          <WhiteSpace size={16} />

          <View style={styles.resultContainer}>
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
          </View>
        </Container>

        <WhiteSpace size={20} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default HostListScreen;
