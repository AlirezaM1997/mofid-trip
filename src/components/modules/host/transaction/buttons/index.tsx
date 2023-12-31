import { View } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AcceptPayment from "./acceptPayment";
import { Feather } from "@expo/vector-icons";
import RejectedDetails from "./rejectedDetails";
import { Button, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ProjectTransactionQueryType } from "@src/gql/generated";

type PropsType = {
  purchaseHandler: () => void;
  transaction: ProjectTransactionQueryType;
};

const TransactionButtons = ({ transaction, purchaseHandler }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [isAcceptPaymentVisible, setIsAcceptPaymentVisible] = useState(false);
  const [isRejectedVisible, setIsRejectedVisible] = useState(false);

  const pressHandler = (pathname: string) => {
    router.push(pathname);
  };
  const handlePressNavigateToHostDetail = (pathname: string, params: object) => {
    router.push({ pathname: pathname, params: params });
  };

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
            title: tr("pay"),
            detailsBtn: true,
            changeHandler: () => setIsAcceptPaymentVisible(true),
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
            detailsBtn: false,
            title: tr("host details"),
            changeHandler: () =>
              handlePressNavigateToHostDetail(`/host/${transaction.project.id}`, {
                id: transaction.project.id,
                name: transaction.project.name,
              }),
          }
        : {
            title: tr("pay"),
            detailsBtn: true,
            changeHandler: () => setIsAcceptPaymentVisible(true),
          },
      SUCCESSFUL: {
        type: "outline",
        color: "secondary",
        detailsBtn: false,
        title: tr("host details"),
        changeHandler: () => pressHandler(`/host/${transaction.project.id}`),
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
          color={buttonType()?.color}
          title={buttonType()?.title}
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
      <RejectedDetails
        transaction={transaction}
        isVisible={isRejectedVisible}
        setIsVisible={setIsRejectedVisible}
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
