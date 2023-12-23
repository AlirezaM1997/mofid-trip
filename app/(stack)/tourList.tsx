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
import SelectedFilters from "@src/components/modules/selected-filters";
import { ActivityIndicator, RefreshControl, StyleSheet } from "react-native";
import { TourListQuery, useTourListLazyQuery } from "@src/gql/generated";
import { Feather } from "@expo/vector-icons";
import Input from "@atoms/input";

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<TourListQuery[] | undefined[]>([]);
  const [_, { networkStatus }] = useTourListLazyQuery({
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
      return data?.tourList?.data;
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
        return data?.tourList?.data;
      };
      getResult().then(res => {
        setList(res as []);
      });
    }
  }, [pageNumber]);

  return (
    <>
      <Container style={{ paddingBottom: 14, paddingTop: 24 }}>
        <Input
          rightIcon={<Feather name="search" size={24} color="black" />}
          placeholder={tr("search for tours")}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </Container>
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
            {list
              .filter(tour => tour.title.includes(searchText))
              .map((tour, index) => (
                <TourCard
                  key={index}
                  id={tour?.id}
                  name={tour?.title}
                  price={tour?.packages[0]?.price}
                  address={tour?.destination?.address}
                  avatarS3={tour?.avatarS3}
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
