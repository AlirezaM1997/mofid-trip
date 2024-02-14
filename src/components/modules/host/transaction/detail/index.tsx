import {
  ProjectTransactionQueryType,
  StatusQueryType,
} from "@src/gql/generated";
import React from "react";
import Invoice from "./invoice";
import Stepper from "@modules/stepper";
import PaymentStep from "./paymentStep";
import Container from "@atoms/container";
import TransactionDetailCard from "./card";
import { Divider, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import StepBaseButtons from "./stepBaseButtons";
import useTranslation from "@src/hooks/translation";
import { ScrollView } from "react-native-gesture-handler";
import CancelTransaction from "@modules/host/transaction/cancel";

const HostTransactionDetail = ({
  transactionDetail,
}: {
  transactionDetail: ProjectTransactionQueryType;
}) => {
  const { tr } = useTranslation();
  const steps = [tr("pending"), tr("accepting"), tr("payment"), tr("finish the trip")];

  const { status, project } = transactionDetail;

  const activeStep = () => {
    const lookup: Record<string, number> = {
      ["REQUEST"]: 1,
      ["ACCEPT"]: 2,
      ["PAYMENT"]: 3,
      ["SUCCESSFUL"]: 4,
    };
    return lookup[status?.step?.name || 0];
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Container style={styles.container}>
        <View style={styles.header}>
          <Text subtitle2>{tr("at what stage is your application?")}</Text>

          <CancelTransaction
            button={
              status?.step?.name === "REQUEST" &&
              status.isActive && (
                <Text subtitle2 type="error" style={styles.headerButton}>
                  {tr("cancel request")}
                </Text>
              )
            }
          />
        </View>

        <Stepper activeStep={activeStep()} isActive={status?.isActive as boolean} steps={steps} />

        <TransactionDetailCard transactionDetail={transactionDetail} />
      </Container>

      <PaymentStep
        status={status}
        creator={project?.creator}
        location={{ lat: project?.accommodation?.lat, lng: project?.accommodation?.lng }}
      />

      <Divider bgColor="grey0" thickness={6} />

      <Container style={styles.container}>
        <Invoice transactionDetail={transactionDetail} />

        <StepBaseButtons status={status as StatusQueryType} transaction={transactionDetail} />
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

export default HostTransactionDetail;
