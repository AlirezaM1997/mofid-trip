import { useTheme } from "@rneui/themed";
import { NetworkStatus } from "@apollo/client";
import React, { useRef, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "@modules/Loading-indicator";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import HostSliderCard from "@modules/host/card/slider-card";
import { ProjectQueryType, useProjectListSearchQuery } from "@src/gql/generated";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";

const MahdiehIranScreen = () => {
  const pageNumber = useRef(1);
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [scrollReachedEnd, setScrollReachedEnd] = useState(false);

  const { data, networkStatus, fetchMore } = useProjectListSearchQuery({
    notifyOnNetworkStatusChange: true,
    variables: { page: { pageNumber: 1, pageSize: 10 } },
  });

  const handleLoadMore = () => {
    pageNumber.current = pageNumber.current + 1;

    fetchMore({
      variables: { page: { pageNumber: pageNumber.current, pageSize: 10 } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          projectList: {
            ...prev.projectList,
            data: [
              ...(prev?.projectList?.data as ProjectQueryType[]),
              ...(fetchMoreResult?.projectList?.data as ProjectQueryType[]),
            ],
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
        (data?.projectList?.data?.length as number) < (data?.projectList?.count as number) &&
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
          title={tr("all hosts")}
          actionTitle={`${data?.projectList?.count?.toString()} ${tr("host")}`}
        />
        <WhiteSpace size={16} />

        <View style={styles.resultContainer}>
          {data?.projectList?.data?.map(project => (
            <HostSliderCard
              key={project?.id}
              name={project?.name}
              price={project?.price}
              id={project?.id as string}
              discount={project?.discount}
              containerStyle={{ width: 325 }}
              address={project?.accommodation?.address}
              avatarS3={project?.accommodation?.avatarS3}
            />
          ))}
        </View>
      </Container>

      <WhiteSpace size={20} />
      {networkStatus === NetworkStatus.fetchMore && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default MahdiehIranScreen;
