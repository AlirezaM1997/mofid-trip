import { View , StyleSheet} from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import AcceptPayment from "./acceptPayment";
import { Feather } from "@expo/vector-icons";
import RejectedDetails from "./rejectedDetails";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ProjectTransactionQueryType } from "@src/gql/generated";
import HostRateBottomSheet from "@modules/rate/host-rate-bottomSheet";

type PropsType = {
  purchaseHandler: () => void;
  purchaseLoading: boolean;
  transaction: ProjectTransactionQueryType;
};

const TransactionButtons = ({ transaction, purchaseHandler, purchaseLoading }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [isAcceptPaymentVisible, setIsAcceptPaymentVisible] = useState<boolean>(false);
  const [isRejectedVisible, setIsRejectedVisible] = useState<boolean>(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);

  const pressHandler = (pathname: string) => {
    router.push(pathname);
  };
  const handleClose = () => setIsBottomSheetVisible(false);
  const buttonType = () => {
    const lookup = {
      REQUEST: {
        type: "outline",
        color: "secondary",
        title: tr("request details"),
        changeHandler: () => pressHandler(`/host/transaction/${transaction.id}`),
      },
      ACCEPT: transaction.status.isActive
        ? {
            title: transaction.project.price ? tr("pay") : tr("reservation"),
            detailsBtn: true,
            changeHandler: transaction.project.price
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
      PAYMENT: transaction.status.isActive
        ? {
            type: "outline",
            color: "secondary",
            title: tr("request details"),
            changeHandler: () => pressHandler(`/host/transaction/${transaction.id}`),
          }
        : {
            title: tr("pay"),
            detailsBtn: true,
            changeHandler: () => setIsAcceptPaymentVisible(true),
          },
      SUCCESSFUL: {
        title: tr("rates to the host"),
        detailsBtn: true,
        changeHandler: () => setIsBottomSheetVisible(true),
      },
    };

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
            title={tr("request details")}
            containerStyle={styles.button}
            onPress={() => pressHandler(`/host/transaction/${transaction.id}`)}
          />
        )}

        <Button
          size="sm"
          icon={buttonType().icon}
          type={buttonType()?.type}
          loading={purchaseLoading}
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
      <HostRateBottomSheet
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
