import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import HostCard from "@modules/host/card";
import { NetworkStatus } from "@apollo/client";
import React, { Fragment, useRef, useState } from "react";
import { BottomSheet, Divider, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import LoadingIndicator from "@modules/Loading-indicator";
import { ScrollView } from "react-native-gesture-handler";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import { useProjectListSearchQuery } from "@src/gql/generated";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";

const SearchHostList = ({ button }) => {
  const pageNumber = useRef(1);
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [scrollReachedEnd, setScrollReachedEnd] = useState(false);

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, networkStatus, fetchMore } = useProjectListSearchQuery({
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

  const handleScroll = ({ nativeEvent }) => {
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const threshold = 150;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - threshold;
    };

    if (isCloseToBottom(nativeEvent)) {
      if (
        data?.projectList?.data?.length < data?.projectList?.count &&
        networkStatus === NetworkStatus.ready
      ) {
        handleLoadMore();
      }
      setScrollReachedEnd(true);
    } else {
      setScrollReachedEnd(false);
    }
  };

  if (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch)
    return <LoadingIndicator />;

  if (networkStatus === NetworkStatus.ready && !data?.projectList?.data?.length)
    return <NoResult />;

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={150}
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
          {data?.projectList?.data?.map(project => (
            <Fragment key={project.id}>
              <HostCard
                id={project.id}
                name={project.name}
                address={project.accommodation.address}
                avatarS3={project.accommodation.avatarS3}
                price={(project.price * (100 - project.discount)) / 100}
              />
              <Divider />
            </Fragment>
          ))}
        </View>
      </Container>

      <WhiteSpace size={20} />
      {networkStatus === NetworkStatus.fetchMore && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {!scrollReachedEnd && <View style={styles.showMapButton}>{button}</View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  showMapButton: {
    bottom: 24,
    left: "50%",
    position: "sticky",
    alignItems: "center",
  },
  resultContainer: { gap: 20 },
});

export default SearchHostList;
