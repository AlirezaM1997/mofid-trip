import React from "react";
import Map from "@modules/map";
import { TransactionStatusEnum } from "@src/gql/generated";
import { Divider } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";

const PaymentStep = ({ status, location }) => {
  return (
    <>
      {[TransactionStatusEnum.Payment, TransactionStatusEnum.Successful].includes(status.step) && (
        <>
          <Divider bgColor="grey0" thickness={6} />

          <Container style={styles.container}>
            <Map lat={location.lat} lng={location.lng} />
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
