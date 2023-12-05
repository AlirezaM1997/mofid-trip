import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  TourTransactionQueryType,
  useMyNgoDetailQuery,
  MyNgoDetailQuery,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import RequestList from "@modules/tour-request-card/RequestList";
import WhiteSpace from "@atoms/white-space";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const { tourId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailQuery["NGODetail"]["tourTransactionSet"]>();

  const { loading, data } = useMyNgoDetailQuery();

  useEffect(() => {
    if (!loading && data) {
      setTransactionSet(
        data.NGODetail.tourTransactionSet.filter(tr => tr.tourPackage.tour.id === tourId)
      );
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  if (!transactionSet.length) return <NoResult />;

  navigation.setOptions({ title: transactionSet[0].tourPackage.tour.title });

  return (
    <Container style={style.container}>
      <View style={style.header}>
        <Text heading2>{tr("requests and passengers")}</Text>
        <Text caption type="grey2">
          {tr("passengers who plan to travel with this tour. please check the submitted requests.")}
        </Text>
      </View>
      <ScrollView contentContainerStyle={style.requestList}>
        {transactionSet.map((transaction: TourTransactionQueryType, i) => (
          <>
            <RequestList key={transaction.id} transaction={transaction} allRequest={false} />
            {transactionSet.length > i + 1 ? <Divider /> : <WhiteSpace size={16} />}
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
  requestList: { gap: 16 },
});

export default RequestScreen;
