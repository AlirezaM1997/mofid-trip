import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { ScrollView, StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import TourReservation from "@organisms/tour-reservation";
import { ifNotLoggedInRedirectTo } from "@src/hooks/auth";
import HostTransaction from "@modules/host/transaction";

const Page = () => {
  const { tr } = useTranslation();

  ifNotLoggedInRedirectTo("/reservation");

  return (
    <>
      <Container style={styles.container}>
        <Text heading2>{tr("my requests")}</Text>
        <Text caption type="grey2">
          {tr("manage your requests for host")}
        </Text>
      </Container>
      <ScrollView style={styles.viewContainer}>
        <HostTransaction />
        <TourReservation />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  viewContainer: { marginBottom: 24 },
  tabContainer: { width: "100%" },
});

export default Page;
