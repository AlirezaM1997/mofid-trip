import React from "react";
import Stepper from "../../../stepper";
import { Divider } from "@rneui/base";
import TransactionDetail from "./details";
import ConfirmButton from "./confirmButtons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType } from "@src/gql/generated";

type PropsType = {
  index: number;
  transaction: TourTransactionQueryType;
};

const ReservationCard = ({ transaction, index }: PropsType) => {
  const { tr } = useTranslation();
  const steps = [tr("pending"), tr("accepting"), tr("payment"), tr("finish the trip")];

  const activeStep = () => {
    const lookup: Record<string, number> = {
      "REQUEST": 1,
      "ACCEPT": 2,
      "PAYMENT": 3,
      "SUCCESSFUL": 4,
    };
    return lookup[transaction.status.step?.name || 0];
  };

  return (
    <>
      {index !== 0 && <Divider style={{ marginVertical: 4 }} />}
      <View style={styles.container}>
        <TransactionDetail transaction={transaction} />
        <Stepper
          steps={steps}
          activeStep={activeStep()}
          isActive={transaction.status.isActive as boolean}
        />
        <ConfirmButton transaction={transaction} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 14, gap: 24 },
});

export default ReservationCard;
