import { NetworkStatus } from "@apollo/client";
import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import { RefreshControl } from "react-native-gesture-handler";
import ReservationCard from "@src/components/modules/host/transaction/card";
import ReservationSkeleton from "@src/components/modules/reservation-skeleton";
import { ProjectTransactionQueryType, useProjectTransactionListQuery } from "@src/gql/generated";

const HostTransaction = () => {
  const isFocused = useIsFocused();
  // TODO: make pagination dynamically
  const { data, refetch, networkStatus } = useProjectTransactionListQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      page: {
        pageNumber: 1,
        pageSize: 100,
      },
    },
  });

  const onRefresh = useCallback(() => {
    try {
      refetch();
    } catch (error) {
      console.error("Error while refetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (networkStatus === NetworkStatus.loading || !data)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Container>
          <ReservationSkeleton />
          <ReservationSkeleton />
          <ReservationSkeleton />
        </Container>
      </ScrollView>
    );

  return (
    <ScrollView
      contentContainerStyle={data?.projectTransactionList?.data?.length === 0 ? { flex: 1 } : {}}
      refreshControl={
        <RefreshControl refreshing={networkStatus !== NetworkStatus.ready} onRefresh={onRefresh} />
      }>
      <Container>
        {data?.projectTransactionList?.data?.map((transaction, index) => (
          <ReservationCard
            transaction={transaction as ProjectTransactionQueryType}
            key={transaction.id}
            index={index}
          />
        ))}
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, marginVertical: 10 },
});

export default HostTransaction;
