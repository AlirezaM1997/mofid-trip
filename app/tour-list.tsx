import { RootState } from "@src/store";
import { Divider } from "@rneui/themed";
import { useSelector } from "react-redux";
import TourCard from "@modules/tour/card";
import { NetworkStatus } from "@apollo/client";
import React, { Fragment, useRef } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "@modules/Loading-indicator";
import NoResult from "@src/components/organisms/no-result";
import WhiteSpace from "@src/components/atoms/white-space";
import SearchBar from "@src/components/modules/search-bar";
import { AccommodationQueryType, useTourListQuery } from "@src/gql/generated";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const TourListScreen: React.FC = () => {
  const pageNumber = useRef(1);
  const { tr } = useTranslation();

  if (__DEV__) {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, networkStatus, fetchMore } = useTourListQuery({
    notifyOnNetworkStatusChange: true,
    variables: filterSlice,
  });

  const handleLoadMore = () => {
    pageNumber.current = pageNumber.current + 1;
    console.log("pageNumber.current", pageNumber.current);
    

    fetchMore({
      variables: { ...filterSlice, page: { ...filterSlice.page, pageNumber: pageNumber.current } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          tourList: {
            ...prev.tourList,
            data: [...prev.tourList.data, ...fetchMoreResult.tourList.data],
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

    if (
      isCloseToBottom(nativeEvent) &&
      data?.tourList?.data?.length < data?.tourList?.count &&
      networkStatus === NetworkStatus.ready
    ) {
      handleLoadMore();
    }
  };

  if (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch)
    return <LoadingIndicator />;

  if (networkStatus === NetworkStatus.ready && !data?.tourList?.data?.length) return <NoResult />;

  return (
    <>
      <SearchBar />
      <Divider />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={150}
        refreshControl={<RefreshControl refreshing={networkStatus === NetworkStatus.refetch} />}
      >
        <Container>
          <WhiteSpace size={24} />
          <TitleWithAction
            size="caption"
            color="grey3"
            title={`${tr("all tours of")} ${filterSlice.search}`}
            actionTitle={`${data?.tourList?.count.toString()} ${tr("tour")}`}
          />
          <WhiteSpace size={16} />

          <View style={styles.resultContainer}>
            {data?.tourList?.data?.map(tour => (
              <Fragment key={tour.id}>
                <TourCard
                  id={tour.id}
                  title={tour.title}
                  avatarS3={tour?.avatarS3}
                  price={tour.packages[0].price}
                  address={(tour.destination as AccommodationQueryType)?.address}
                />
                <Divider />
              </Fragment>
            ))}
          </View>

          <WhiteSpace size={20} />
          {networkStatus === NetworkStatus.fetchMore && <ActivityIndicator />}
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default TourListScreen;
