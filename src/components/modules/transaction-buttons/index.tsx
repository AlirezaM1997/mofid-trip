import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import AcceptPayment from "./acceptPayment";
import useTranslation from "@src/hooks/translation";
import CancelTransaction from "./cancelTransaction";

type PropsType = {
  transactionId: string;
  cancelHandler: () => void;
  apiTransactionStep: string;
  purchaseHandler: () => void;
  status: { step: string | number; isActive: boolean };
  setStatus: (status: { step: string | number; isActive: boolean }) => void;
};

const TransactionButtons = ({
  cancelHandler,
  status,
  setStatus,
  transactionId,
  purchaseHandler,
  apiTransactionStep,
}: PropsType) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [isAcceptPaymentVisible, setIsAcceptPaymentVisible] = useState(false);

  const onCancel = async () => setIsCancelVisible(true);

  const payToReserve = () => setIsAcceptPaymentVisible(true);

  const openReserveBill = () => {
    router.push({
      pathname: "/receipt",
      params: {
        transactionId: transactionId,
      },
    });
  };

  const buttonType = () => {
    const lookup = {
      REQUEST: {
        title: tr("cancel request"),
        type: "outline",
        changeHandler: onCancel,
        color: "secondary",
        cancel: false,
      },
      ACCEPT: {
        title: tr("pay"),
        type: "solid",
        changeHandler: payToReserve,
        color: "primary",
        cancel: true,
      },
      PAYMENT: {
        title: tr("view receipt"),
        type: "solid",
        changeHandler: openReserveBill,
        color: "primary",
        cancel: false,
      },
    };
    if (!status.isActive) return { title: tr("Rejected"), type: "solid", disabled: true };
    if (status.step in lookup) return lookup[status.step];
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        {buttonType()?.cancel && (
          <Button
            size="sm"
            type="outline"
            color="secondary"
            onPress={onCancel}
            title={tr("Cancel Request")}
            containerStyle={styles.button}
          />
        )}

        <Button
          size="sm"
          type={buttonType()?.type}
          title={buttonType()?.title}
          color={buttonType()?.color}
          containerStyle={styles.button}
          disabled={buttonType()?.disabled}
          onPress={buttonType()?.changeHandler}
        />
      </View>

      <AcceptPayment
        purchaseHandler={purchaseHandler}
        isVisible={isAcceptPaymentVisible}
        setIsVisible={setIsAcceptPaymentVisible}
      />
      <CancelTransaction
        setStatus={setStatus}
        isVisible={isCancelVisible}
        transactionId={transactionId}
        cancelHandler={cancelHandler}
        setIsVisible={setIsCancelVisible}
        apiTransactionStep={apiTransactionStep}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 6,
  },
  button: {
    flex: 1,
    width: "100%",
  },
  close: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    backgroundColor: "#fff",
  },
  contentContainerStyle: { backgroundColor: "#fff" },
  centerText: {
    textAlign: "center",
  },
});

export default TransactionButtons;
