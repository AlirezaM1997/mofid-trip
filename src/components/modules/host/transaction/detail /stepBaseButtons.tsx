import React from "react";
import { router } from "expo-router";
import useTranslation from "@src/hooks/translation";
import { Divider, Text, useTheme } from "@rneui/themed";
import { TransactionStatusEnum } from "@src/gql/generated";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CancelTransaction from "@modules/host/transaction/cancel ";

const StepBaseButtons = ({ status, transactionId, name }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const editReservationHandler = () => {
    router.push({
      pathname: `/host/transaction/add/confirm-data`,
      params: {
        projectId: transactionId,
        name: JSON.stringify(name),
      },
    });
  };

  return (
    <>
      {status.step === TransactionStatusEnum.Request && status.isActive && (
        <>
          <Divider />
          <Pressable style={styles.buttonContainer} onPress={editReservationHandler}>
            <View style={styles.buttonContent}>
              <Feather name="circle" size={13} color="black" />
              <Text>{tr("edit reservation information")}</Text>
            </View>

            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </Pressable>

          <CancelTransaction
            button={
              <View style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                  <Feather name="circle" size={13} color={theme.colors.error} />
                  <Text type="error">{tr("cancel the initial request")}</Text>
                </View>

                <MaterialIcons name="keyboard-arrow-left" size={24} color={theme.colors.error} />
              </View>
            }
          />
        </>
      )}

      {status.step === TransactionStatusEnum.Successful && (
        <>
          <Divider />
          <Pressable
            style={styles.buttonContainer}
            onPress={() => router.push(`host/transaction/successReceipt?id=${transactionId}`)}>
            <View style={styles.buttonContent}>
              <Feather name="circle" size={13} color="black" />
              <Text>{tr("view invoice")}</Text>
            </View>

            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </Pressable>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default StepBaseButtons;
