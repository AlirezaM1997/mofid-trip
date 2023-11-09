import Stepper from "../stepper";
import { Divider } from "@rneui/base";
import TransactionDetail from "./details";
import ConfirmButton from "./confirmButtons";
import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType } from "@src/gql/generated";

type PropsType = {
  index: number;
  transaction: TourTransactionQueryType;
};

const ReservationCard = ({ transaction, index }: PropsType) => {
  const { tr } = useTranslation();
  const steps = [tr("my request"), tr("Accepting"), tr("payment"), tr("Successful")];
  const [status, setStatus] = useState<{ step: number | string; isActive: boolean }>({
    step: 0,
    isActive: false,
  });

  useEffect(() => {
    setStatus({ step: transaction.status.step, isActive: transaction.status.isActive });
  }, [transaction]);

  const activeStep = () => {
    const lookup: Record<string, number> = {
      REQUEST: 1,
      ACCEPT: 2,
      PAYMENT: 3,
      SUCCESSFUL: 4,
    };
    return lookup[status?.step || 0];
  };

  return (
    <>
      {index !== 0 && <Divider style={{ marginVertical: 4 }} />}
      <View style={styles.container}>
        <TransactionDetail transaction={transaction} />
        <Stepper steps={steps} activeStep={activeStep()} isActive={status.isActive as boolean} />
        <ConfirmButton
          status={status}
          setStatus={setStatus}
          transaction={transaction}
          apiTransactionStep={transaction.status?.step as string}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 14, gap: 24 },
});

export default ReservationCard;
