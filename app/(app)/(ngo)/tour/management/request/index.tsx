import {
  TourTransactionQueryType,
  useMyNgoDetailTourTransactionSetQuery,
} from "@src/gql/generated";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { useNavigation } from "expo-router";
import NoResult from "@organisms/no-result";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { useIsFocused } from "@react-navigation/native";
import LoadingIndicator from "@modules/Loading-indicator";
import { View, StyleSheet, ScrollView } from "react-native";
import RequestList from "@modules/tour-request-card/RequestList";
import RequestListBottomSheet from "@modules/tour-request-card/request-list-bottomsheet";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TourTransactionQueryType>();

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const handleRequestPress = (transaction: TourTransactionQueryType) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  const { loading, data, refetch } = useMyNgoDetailTourTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (loading && !data) return <LoadingIndicator />;

  const transactionSet = data?.NGODetail?.tourTransactionSet as TourTransactionQueryType[];

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
