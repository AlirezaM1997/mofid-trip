import React from "react";
import Map from "@modules/map";
import { Divider } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";

const PaymentStep = ({ status, destination }) => {
  return (
    <>
      {["PAYMENT", "SUCCESSFUL"].includes(status.step.name) && (
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
