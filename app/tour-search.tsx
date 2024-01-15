import { Button } from "@rneui/themed";
import TourCard from "@modules/tour/card";
import { PAGE_SIZE } from "@src/settings";
import { NetworkStatus } from "@apollo/client";
import { Divider, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import WhiteSpace from "@src/components/atoms/white-space";
import NoResult from "@src/components/organisms/no-result";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { useTourListQuery } from "@src/gql/generated";
import TourSearchBar from "@modules/search-bar/tour-search-bar";

const TourSearch: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data, networkStatus } = useTourListQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      sort: {
        descending: false,
      },
      page: { pageNumber: pageNumber, pageSize: 10 },
    },
  });

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready && data) {
      setList([...list, ...data.tourList.data]);
    }
  }, [networkStatus, data]);

  const handleFetchMore = () => setPageNumber(pageNumber + 1);

  return (
    <>
      <TourSearchBar onChangeText={e => setSearchText(e)} value={searchText} />
      <Divider />
      <ScrollView
        refreshControl={<RefreshControl refreshing={networkStatus === NetworkStatus.refetch} />}>
        {networkStatus === NetworkStatus.loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Container size={25} style={styles.resultContainer}>
            {list
              .filter(tour => tour.title.toLowerCase().includes(searchText.toLowerCase()))
              .map((tour, index) => (
                <TourCard
                  key={index}
                  id={tour?.id}
                  title={tour?.title}
                  price={tour?.packages[0]?.price}
                  address={tour?.destination?.address}
                  avatarS3={tour?.avatarS3}
                />
              ))}
            {list?.length === PAGE_SIZE * pageNumber || networkStatus !== NetworkStatus.ready ? (
              <Button
                type="outline"
                onPress={handleFetchMore}
                loading={networkStatus !== NetworkStatus.ready}>
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

export default TourSearch;
