import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  TourTransactionQueryType,
  MyNgoDetailTourTransactionSetQuery,
  useMyNgoDetailTourTransactionSetQuery,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useNavigation } from "expo-router";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import RequestList from "@modules/tour-request-card/RequestList";
import RequestListBottomSheet from "@modules/tour-request-card/request-list-bottomsheet";
import { useIsFocused } from "@react-navigation/native";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TourTransactionQueryType>();
  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailTourTransactionSetQuery["NGODetail"]["tourTransactionSet"]>();

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const handleRequestPress = (transaction: TourTransactionQueryType) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  const { loading, data, refetch, networkStatus } = useMyNgoDetailTourTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!loading && data) {
      setTransactionSet(data.NGODetail.tourTransactionSet);
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  if (!transactionSet.length) return <NoResult />;

  navigation.setOptions({ title: tr("apply to my tours") });

  return (
    <>
      <Container style={style.container}>
        <View style={style.header}>
          <Text heading2>{tr("requests received for tours")}</Text>
          <Text caption type="grey2">
            {tr("all requests received from travelers who plan to travel with your tours")}
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
      <RequestListas voidBottomSheet
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
