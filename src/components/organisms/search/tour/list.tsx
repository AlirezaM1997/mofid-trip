import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import TourCard from "@modules/tour/card";
import { NetworkStatus } from "@apollo/client";
import { Divider, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView } from "react-native-gesture-handler";
import React, { Fragment, useRef, useState } from "react";
import LoadingIndicator from "@modules/Loading-indicator";
import NoResult from "@src/components/organisms/no-result";
import WhiteSpace from "@src/components/atoms/white-space";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import { AccommodationQueryType, useTourListSearchQuery } from "@src/gql/generated";

const SearchTourList = ({ button }) => {
  const pageNumber = useRef(1);
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [scrollReachedEnd, setScrollReachedEnd] = useState(false);

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, networkStatus, fetchMore } = useTourListSearchQuery({
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
          tourList: {
            ...prev.tourList,
            data: [...prev.tourList.data, ...fetchMoreResult?.tourList?.data],
          },
        };
      },
    });
  };

  const handleScroll = ({ nativeEvent }) => {
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const threshold = 50;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - threshold;
    };

    if (isCloseToBottom(nativeEvent)) {
      if (
        data?.tourList?.data?.length as number < (data?.tourList?.count as number) &&
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

  if (networkStatus === NetworkStatus.ready && !data?.tourList?.data?.length) return <NoResult />;

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
          title={`${tr("all tours of")} ${filterSlice.search}`}
          actionTitle={`${data?.tourList?.count?.toString()} ${tr("tour")}`}
        />
        <WhiteSpace size={16} />

        <View style={styles.resultContainer}>
          {data?.tourList?.data?.map(tour => (
            <Fragment key={tour?.id}>
              <TourCard
                id={tour?.id as string}
                title={tour?.title as string}
                avatarS3={tour?.avatarS3}
                price={tour?.packages?.[0]?.price as number}
                address={(tour?.destination as AccommodationQueryType)?.address as string}
              />
              <Divider />
            </Fragment>
          ))}
        </View>

        <WhiteSpace size={20} />
        {networkStatus === NetworkStatus.fetchMore && (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        )}
      </Container>

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

export default SearchTourList;
