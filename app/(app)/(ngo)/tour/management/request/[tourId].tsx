import {
  TourTransactionQueryType,
  useMyNgoDetailTourTransactionSetQuery,
} from "@src/gql/generated";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import NoResult from "@organisms/no-result";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { useIsFocused } from "@react-navigation/native";
import LoadingIndicator from "@modules/Loading-indicator";
import { View, StyleSheet, ScrollView } from "react-native";
import RequestList from "@modules/tour-request-card/RequestList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import RequestListBottomSheet from "@modules/tour-request-card/request-list-bottomsheet";

const RequestScreen = () => {
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TourTransactionQueryType>();

  const handleClose = () => setIsVisible(false);
  const handleOpen = () => setIsVisible(true);

  const { loading, data, refetch } = useMyNgoDetailTourTransactionSetQuery({
    notifyOnNetworkStatusChange: true,
  });

  const handleRequestPress = (transaction: TourTransactionQueryType) => {
    setSelectedTransaction(transaction);
    handleOpen();
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (loading && !data) return <LoadingIndicator />;

  const transactionSet = data?.NGODetail?.tourTransactionSet?.filter(
    tr => tr?.tourPackage?.tour?.id === tourId
  ) as TourTransactionQueryType[];

  navigation.setOptions({ title: transactionSet?.[0]?.tourPackage?.tour?.title || tr("requests") });

  if (!transactionSet.length) return <NoResult title={tr("there is no request for this tour")} />;

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
          {transactionSet.map((transaction: TourTransactionQueryType) => (
            <RequestList
              key={transaction.id}
              transaction={transaction}
              onPress={() => handleRequestPress(transaction)}
            />
          ))}
        </ScrollView>
      </Container>
      <RequestListBottomSheet
        refetch={refetch}
        isVisible={isVisible}
        handleClose={handleClose}
        onBackdropPress={handleClose}
        transaction={selectedTransaction as TourTransactionQueryType}
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
