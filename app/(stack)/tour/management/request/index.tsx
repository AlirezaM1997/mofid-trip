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
import { useNavigation } from "expo-router";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import RequestList from "@modules/tour-request-card/RequestList";
import RequestListBottomSheet from "@modules/request-list-bottomsheet";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TourTransactionQueryType>();
  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailQuery["NGODetail"]["tourTransactionSet"]>();

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const handleRequestPress = (transaction: TourTransactionQueryType) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  const { loading, data } = useMyNgoDetailQuery();

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
      <RequestListBottomSheet
        isVisible={isVisible}
        onBackdropPress={handleClose}
        transaction={selectedTransaction}
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
