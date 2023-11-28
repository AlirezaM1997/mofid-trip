import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import { ifNotLoggedInRedirectTo } from "@src/hooks/auth";
import HostTransaction from "@organisms/host-transaction";

const HostTransactionScreen = () => {
  const { tr } = useTranslation();

  ifNotLoggedInRedirectTo("/host/transaction");

  return (
    <>
      <Container style={styles.container}>
        <Text heading2>{tr("my requests")}</Text>
        <Text caption type="grey2">
          {tr("manage your requests for hosting and trips")}
        </Text>
      </Container>

      <HostTransaction />
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 24 },
  tabContainer: { width: "100%" },
});

export default HostTransactionScreen;
