import React from "react";
import Map from "@modules/map";
import { TransactionStatusEnum } from "@src/gql/generated";
import { Divider } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";

const PaymentStep = ({ status, destination }) => {
  return (
    <>
      {[TransactionStatusEnum.Payment, TransactionStatusEnum.Successful].includes(status.step) && (
        <>
          <Divider bgColor="grey0" thickness={6} />

          <Container style={styles.container}>
            <Map lat={destination.lat} lng={destination.lng} />
          </Container>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});

export default PaymentStep;
