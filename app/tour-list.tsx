import React, { Fragment, useRef } from "react";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import TourCard from "@modules/tour/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import TitleWithAction from "@modules/title-with-action";
import LoadingIndicator from "@modules/Loading-indicator";
import { Button, Divider, Text, useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import NoResult from "@src/components/organisms/no-result";
import WhiteSpace from "@src/components/atoms/white-space";
import SearchBar from "@src/components/modules/search-bar";
import { RefreshControl, StyleSheet, View } from "react-native";
import { AccommodationAddInputType, useTourListQuery } from "@src/gql/generated";

const TourListScreen: React.FC = () => {
  const pageNumber = useRef(1);
  const { tr } = useTranslation();

  const { filterSlice } = useSelector((state: RootState) => state);

  const { data, networkStatus, fetchMore } = useTourListQuery({
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
            data: [...prev.tourList.data, ...fetchMoreResult.tourList.data],
          },
        };
      },
    });
  };

  if (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch)
    return <LoadingIndicator />;

  if (networkStatus === NetworkStatus.ready && !data?.tourList?.data?.length) return <NoResult />;

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
            title={`${tr("all tours of")} ${filterSlice.search}`}
            actionTitle={`${data?.tourList?.count.toString()} ${tr("tour")}`}
          />
          <WhiteSpace size={16} />

          <View style={styles.resultContainer}>
            {data?.tourList?.data?.map((tour, index) => (
              <Fragment key={index}>
                <TourCard
                  id={tour.id}
                  title={tour.title}
                  avatarS3={tour.avatarS3}
                  price={tour.packages[0].price}
                  address={(tour.destination as AccommodationAddInputType).address}
                />
                <Divider />
              </Fragment>
            ))}
            {data?.tourList?.data?.length &&
            data?.tourList?.data?.length === pageNumber.current * PAGE_SIZE ? (
              <Button
                type="outline"
                onPress={handleLoadMore}
                disabled={networkStatus === NetworkStatus.refetch}
                loading={networkStatus === NetworkStatus.refetch}>
                {tr("Fetch More")}
              </Button>
            ) : null}
          </View>

          <WhiteSpace size={20} />
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: { gap: 20 },
});

export default TourListScreen;
