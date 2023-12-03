import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Divider, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { useNgoDetailQuery, TourTransactionQueryType } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useLocalSearchParams, useNavigation } from "expo-router";
import RequestList from "../../../../src/components/modules/tour-request-card/RequestList";
import Container from "@atoms/container";

const RequestToMyToursScreen = () => {
  const { tr } = useTranslation();
  const { data, loading } = useNgoDetailQuery();
  const { tourName } = useLocalSearchParams();
  const navigation = useNavigation();

  navigation.setOptions({ title: tourName || tr("apply to my tours") });

  if (loading || !data) return <LoadingIndicator />;

  return (
    <Container style={style.container}>
      <View style={style.header}>
        <Text heading2>
          {tourName ? tr("requests and passengers") : tr("requests received for tours")}
        </Text>
        <Text caption type="grey2">
          {tourName
            ? tr(
                "passengers who plan to travel with this tour. please check the submitted requests."
              )
            : tr("all requests received from travelers who plan to travel with your tours")}
        </Text>
      </View>
      <ScrollView contentContainerStyle={style.cardList}>
        {(tourName
          ? data.NGODetail.tourTransactionSet.filter(
              tour => tour.tourPackage.tour.title === tourName
            )
          : data.NGODetail.tourTransactionSet
        ).map((transaction: TourTransactionQueryType, i) => (
          <>
            <RequestList
              key={transaction.owner.id}
              transaction={transaction}
              tourName={tourName as string}
            />
            {tourName
              ? data.NGODetail.tourTransactionSet.filter(
                  tour => tour.tourPackage.tour.title === tourName
                ).length >
                  i + 1 && <Divider />
              : data.NGODetail.tourTransactionSet.length > i + 1 && <Divider />}
          </>
        ))}
      </ScrollView>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 24,
    gap: 30,
  },
  header: {
    gap: 4,
  },
  cardList: {
    gap: 24,
  },
});

export default RequestToMyToursScreen;
