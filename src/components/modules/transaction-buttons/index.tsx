import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AcceptPayment from "./acceptPayment";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType } from "@src/gql/generated";

type PropsType = {
  purchaseHandler: () => void;
  transaction: TourTransactionQueryType;
};

const TransactionButtons = ({ transaction, purchaseHandler }: PropsType) => {
  const { tr } = useTranslation();
  const [isAcceptPaymentVisible, setIsAcceptPaymentVisible] = useState(false);

  const pressHandler = (pathname: string) => {
    router.push(pathname);
  };

  const buttonType = () => {
    const lookup = {
      REQUEST: {
        type: "outline",
        detailsBtn: false,
        color: "secondary",
        title: tr("request details"),
        changeHandler: () => pressHandler(`/tour-transaction-detail/${transaction.id}`),
      },
      ACCEPT: {
        type: "solid",
        color: "primary",
        title: tr("pay"),
        detailsBtn: true,
        changeHandler: () => setIsAcceptPaymentVisible(true),
      },
      PAYMENT: {
        type: "outline",
        color: "secondary",
        detailsBtn: false,
        title: tr("tour details"),
        changeHandler: () => pressHandler(`/tour/${transaction.id}`),
      },
    };
    if (!transaction.status.isActive)
      return { title: tr("Rejected"), type: "outline", disabled: true };
    if (transaction.status.step in lookup) return lookup[transaction.status.step];
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        {buttonType()?.detailsBtn && (
          <Button
            size="sm"
            type="outline"
            color="secondary"
            onPress={() => pressHandler(`/tour-transaction-detail/${transaction.id}`)}
            title={tr("request details")}
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
