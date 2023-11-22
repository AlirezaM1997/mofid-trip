import React from "react";
import Stepper from "@modules/stepper";
import PaymentStep from "./paymentStep";
import Container from "@atoms/container";
import { Divider, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import StepBaseButtons from "./stepBaseButtons";
import { useLocalSearchParams } from "expo-router";
import useTranslation from "@src/hooks/translation";
import { ScrollView } from "react-native-gesture-handler";
import Invoice from "@modules/transaction-detail/invoice";
import CancelTransaction from "@modules/cancel-transaction";
import TransactionDetailCard from "@modules/transaction-detail/card";
import { TourPackageType, TransactionStatusEnum } from "@src/gql/generated";

const TourTransactionDetail = ({ transactionDetail }) => {
  const { tr } = useTranslation();
  const { transactionId } = useLocalSearchParams();
  const steps = [tr("pending"), tr("accepting"), tr("payment"), tr("finish the trip")];

  const { status, tourPackage } = transactionDetail;

  const activeStep = () => {
    const lookup: Record<string, number> = {
      REQUEST: 1,
      ACCEPT: 2,
      PAYMENT: 3,
      SUCCESSFUL: 4,
    };
    return lookup[status.step || 0];
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text subtitle2>{tr("at what stage is your application?")}</Text>

          <CancelTransaction
            button={
              status.step === TransactionStatusEnum.Request &&
              status.isActive && (
                <Text subtitle2 type="error" style={styles.headerButton}>
                  {tr("cancel request")}
                </Text>
              )
            }
          />
        </View>

        <Stepper activeStep={activeStep()} isActive={status.isActive as boolean} steps={steps} />

        <TransactionDetailCard tourPackage={tourPackage} />
      </Container>

      <PaymentStep status={status} destination={tourPackage.tour.destination} />

      <Divider bgColor="grey0" thickness={6} />

      <Container style={styles.container}>
        <Invoice tourPackage={tourPackage as TourPackageType} />

        <StepBaseButtons status={status} tourPackage={tourPackage} transactionId={transactionId} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    gap: 24,
    marginVertical: 24,
  },
  container: {
    gap: 24,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerButton: {
    textDecorationLine: "underline",
  },
});

export default TourTransactionDetail;
