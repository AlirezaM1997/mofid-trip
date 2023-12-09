import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
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
import RequestListBottomSheet from "@modules/tour-request-card/request-list-bottomsheet";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const { tourId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TourTransactionQueryType>();

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const { loading, data, refetch } = useMyNgoDetailQuery();

  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailQuery["NGODetail"]["tourTransactionSet"]>();

  const handleRequestPress = (transaction: TourTransactionQueryType) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

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
    <>
      <Container style={style.container}>
        <View style={style.header}>
          <Text heading2>{tr("requests and passengers")}</Text>
          <Text caption type="grey2">
            {tr(
              "passengers who plan to travel with this tour. please check the submitted requests."
            )}
          </Text>
        </View>
        <ScrollView>
          {transactionSet.map((transaction: TourTransactionQueryType, i) => (
            <RequestList
              key={transaction.id}
              transaction={transaction}
              onPress={() => handleRequestPress(transaction)}
            />
          ))}
        </ScrollView>
      </Container>
      <RequestListBottomSheet
        isVisible={isVisible}
        onBackdropPress={handleClose}
        handleClose={handleClose}
        transaction={selectedTransaction}
        refetch={refetch}
      />
    </>
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
});

export default RequestScreen;
