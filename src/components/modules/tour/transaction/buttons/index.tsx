import { View } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AcceptPayment from "./acceptPayment";
import { Feather } from "@expo/vector-icons";
import RejectedDetails from "./rejectedDetails";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType } from "@src/gql/generated";
import TourRateBottomSheet from "@modules/rate/tour-rate-bottomSheet";

type PropsType = {
  purchaseLoading: boolean;
  purchaseHandler: () => void;
  transaction: TourTransactionQueryType;
};

const TransactionButtons = ({ transaction, purchaseHandler, purchaseLoading }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [isAcceptPaymentVisible, setIsAcceptPaymentVisible] = useState<boolean>(false);
  const [isRejectedVisible, setIsRejectedVisible] = useState<boolean>(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);

  const handleClose = () => setIsBottomSheetVisible(false);
  const pressHandler = (pathname: string) => {
    router.push(pathname);
  };

  const buttonType = () => {
    const lookup = {
      "REQUEST": {
        type: "outline",
        color: "secondary",
        title: tr("request details"),
        changeHandler: () => pressHandler(`/tour/transaction/detail/${transaction.id}`),
      },
      "ACCEPT": transaction.status.isActive
        ? {
            title: transaction.tourPackage.price ? tr("pay") : tr("reservation"),
            detailsBtn: true,
            changeHandler: transaction.tourPackage.price
              ? () => setIsAcceptPaymentVisible(true)
              : purchaseHandler,
          }
        : {
            title: tr("reason for rejecting the request"),
            changeHandler: () => setIsRejectedVisible(true),
            icon: (
              <Feather name="info" size={16} style={{ marginLeft: 8 }} color={theme.colors.white} />
            ),
          },
      "PAYMENT": transaction.status.isActive
        ? {
            type: "outline",
            color: "secondary",
            detailsBtn: false,
            title: tr("request details"),
            changeHandler: () => pressHandler(`/tour/transaction/detail/${transaction.id}`),
          }
        : {
            title: tr("pay"),
            detailsBtn: true,
            changeHandler: () => setIsAcceptPaymentVisible(true),
          },
          SUCCESSFUL: {
            title: tr("rates to the tour"),
            detailsBtn: true,
            changeHandler: () => setIsBottomSheetVisible(true),
          },
    };

    if (transaction.status.step?.name in lookup) return lookup[transaction.status.step?.name];
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        {buttonType()?.detailsBtn && (
          <Button
            size="sm"
            type="outline"
            color="secondary"
            title={tr("request details")}
            containerStyle={styles.button}
            onPress={() => pressHandler(`/tour/transaction/detail/${transaction.id}`)}
          />
        )}

        <Button
          size="sm"
          icon={buttonType().icon}
          loading={purchaseLoading}
          type={buttonType()?.type}
          color={buttonType()?.color}
          title={buttonType()?.title}
          containerStyle={styles.button}
          disabled={buttonType()?.disabled}
          onPress={buttonType()?.changeHandler}
        />
      </View>

      <AcceptPayment
        purchaseLoading={purchaseLoading}
        purchaseHandler={purchaseHandler}
        isVisible={isAcceptPaymentVisible}
        setIsVisible={setIsAcceptPaymentVisible}
      />
      <RejectedDetails
        transaction={transaction}
        isVisible={isRejectedVisible}
        setIsVisible={setIsRejectedVisible}
      />
      <TourRateBottomSheet
        transaction={transaction}
        isVisible={isBottomSheetVisible}
        handleClose={handleClose}
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
