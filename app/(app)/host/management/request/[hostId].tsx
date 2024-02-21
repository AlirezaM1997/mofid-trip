import {
  ProjectTransactionQueryType,
  useMyUserDetailProjectTransactionSetQuery,
} from "@src/gql/generated";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { useIsFocused } from "@react-navigation/native";
import LoadingIndicator from "@modules/Loading-indicator";
import { View, StyleSheet, ScrollView } from "react-native";
import RequestList from "@modules/host-request-card/RequestList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import RequestListBottomSheet from "@modules/host-request-card/request-list-bottomsheet";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { hostId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ProjectTransactionQueryType>();

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const { loading, data, refetch } = useMyUserDetailProjectTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [transactionSet, setTransactionSet] = useState<ProjectTransactionQueryType[]>([]);

  const handleRequestPress = (transaction: ProjectTransactionQueryType) => {
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
        data.userDetail?.projectTransactionSet?.filter(
          pr => pr?.project?.id === hostId
        ) as ProjectTransactionQueryType[]
      );
    }
  }, [loading, data]);

  if (loading || !transactionSet) return <LoadingIndicator />;

  navigation.setOptions({ title: transactionSet?.[0]?.project?.name || tr("requests") });

  if (!transactionSet.length) return <NoResult title={tr("there is no request for this host")} />;

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
          {transactionSet?.map((transaction: ProjectTransactionQueryType, i) => (
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
        transaction={selectedTransaction as ProjectTransactionQueryType}
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
