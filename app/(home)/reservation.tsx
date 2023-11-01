import { useDispatch } from "react-redux";
import { NetworkStatus } from "@apollo/client";
import { useIsAuthenticated } from "@src/hooks/user";
import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import NoResult from "@src/components/organisms/no-result";
import { RefreshControl } from "react-native-gesture-handler";
import { setTransactionList } from "@src/slice/transaction-list-slice";
import ReservationCard from "@src/components/modules/reservation-card";
import ReservationSkeleton from "@src/components/modules/reservation-skeleton";
import { ProjectTransactionQueryType, useProjectTransactionListQuery } from "@src/gql/generated";
import { router } from "expo-router";

const Page = () => {
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

  if (!isAuthenticated)
    return router.push({
      pathname: "/authentication",
      params: { protectedScreen: "/reservation" },
    });

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
      contentContainerStyle={
        data?.projectTransactionList?.data?.length === 0
          ? {
              flex: 1,
            }
          : {}
      }
      refreshControl={
        <RefreshControl refreshing={networkStatus !== NetworkStatus.ready} onRefresh={onRefresh} />
      }>
      {data?.projectTransactionList?.data?.length === 0 && <NoResult />}
      {data?.projectTransactionList?.data?.map((transaction, index) => (
        <Container key={transaction.id}>
          <ReservationCard transaction={transaction as ProjectTransactionQueryType} index={index} />
        </Container>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, marginVertical: 10 },
});

export default Page;
