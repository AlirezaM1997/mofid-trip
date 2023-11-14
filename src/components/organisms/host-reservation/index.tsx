import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { NetworkStatus } from "@apollo/client";
import { useIsAuthenticated } from "@src/hooks/auth";
import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import NoResult from "@src/components/organisms/no-result";
import { RefreshControl } from "react-native-gesture-handler";
import { setTransactionList } from "@src/slice/transaction-list-slice";
import ReservationCard from "@modules/tour-reservation-card";
import ReservationSkeleton from "@src/components/modules/reservation-skeleton";
import { ProjectTransactionQueryType, useProjectTransactionListQuery } from "@src/gql/generated";

const HostReservation = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const isAuthenticated = useIsAuthenticated();
  const { data, refetch, networkStatus } = useProjectTransactionListQuery({
    notifyOnNetworkStatusChange: true,
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

  if (!isAuthenticated) {
    router.push({
      pathname: "/authentication",
      params: { protectedScreen: "/reservation" },
    });
    return;
  }

  if (networkStatus === NetworkStatus.loading)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Container>
          <ReservationSkeleton />
          <ReservationSkeleton />
          <ReservationSkeleton />
        </Container>
      </ScrollView>
    );

  dispatch(setTransactionList(data));

  return (
    <ScrollView
      contentContainerStyle={data?.projectTransactionList?.data?.length === 0 ? { flex: 1 } : {}}
      refreshControl={
        <RefreshControl refreshing={networkStatus !== NetworkStatus.ready} onRefresh={onRefresh} />
      }>
      {data?.projectTransactionList?.data?.length === 0 && <NoResult />}

      {data?.projectTransactionList?.data?.map((transaction, index) => (
        <ReservationCard
          transaction={transaction as ProjectTransactionQueryType}
          key={transaction.id}
          index={index}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, marginVertical: 10 },
});

export default HostReservation;
