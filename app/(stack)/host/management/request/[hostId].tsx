import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  useMyNgoDetailProjectTransactionSetQuery,
  MyNgoDetailProjectTransactionSetQuery,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import RequestList from "@modules/host-request-card/RequestList";
import RequestListBottomSheet from "@modules/host-request-card/request-list-bottomsheet";
import { useIsFocused } from "@react-navigation/native";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const { hostId } = useLocalSearchParams();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"][number]>();

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const { loading, data, refetch } = useMyNgoDetailProjectTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [transactionSet, setTransactionSet] = useState<
    MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"]
  >([]);

  const handleRequestPress = (
    transaction: MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"][number]
  ) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!loading && data) {
      setTransactionSet(
        data.NGODetail.projectTransactionSet.filter(pr => pr.project.id === hostId)
      );
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  if (!transactionSet.length) return <NoResult />;

  navigation.setOptions({ title: transactionSet[0].project.name });

  console.log("transactionSet", transactionSet);

  return (
    <>
      <Container style={style.container}>
        <View style={style.header}>
          <Text heading2>{tr("requests and passengers")}</Text>
          <Text caption type="grey2">
            {tr("travelers who plan to travel to this host. please check the submitted requests.")}
          </Text>
        </View>
        <ScrollView>
          {transactionSet?.map(
            (
              transaction: MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"][number],
              i
            ) => (
              <RequestList
                key={transaction.id}
                transaction={transaction}
                onPress={() => handleRequestPress(transaction)}
              />
            )
          )}
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
