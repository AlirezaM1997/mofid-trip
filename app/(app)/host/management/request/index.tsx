import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  MyNgoDetailProjectTransactionSetQuery,
  MyUserDetailProjectTransactionSetQuery,
  useMyUserDetailProjectTransactionSetQuery,
} from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import { useNavigation } from "expo-router";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import RequestList from "@modules/host-request-card/RequestList";
import RequestListBottomSheet from "@modules/host-request-card/request-list-bottomsheet";
import { useIsFocused } from "@react-navigation/native";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"][number]>();
  const [transactionSet, setTransactionSet] =
    useState<MyNgoDetailProjectTransactionSetQuery["NGODetail"]["projectTransactionSet"]>();

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);
  const handleRequestPress = (
    transaction: MyUserDetailProjectTransactionSetQuery["userDetail"]["projectTransactionSet"][number]
  ) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  const { loading, data, refetch } = useMyUserDetailProjectTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!loading && data) {
      setTransactionSet(data.userDetail.projectTransactionSet);
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  if (!transactionSet.length) return <NoResult />;

  navigation.setOptions({ title: tr("apply to my hosts") });

  return (
    <ScrollView>
      <Container style={style.container}>
        <View style={style.header}>
          <Text heading2>{tr("requests received")}</Text>
          <Text caption type="grey2">
            {tr(
              "management of requests received from users who intend to experience your hosting."
            )}
          </Text>
        </View>
        <ScrollView>
          {transactionSet.map(
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
    </ScrollView>
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
