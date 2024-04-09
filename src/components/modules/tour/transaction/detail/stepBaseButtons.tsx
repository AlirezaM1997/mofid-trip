import React from "react";
import { router } from "expo-router";
import useTranslation from "@src/hooks/translation";
import { Divider, Text, useTheme } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CancelTransaction from "@modules/tour/transaction/cancle";
import { StatusQueryType, TourPackageType } from "@src/gql/generated";

const StepBaseButtons = ({
  status,
  transactionId,
  tourPackage,
}: {
  status: StatusQueryType;
  transactionId: string;
  tourPackage: TourPackageType;
}) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const editReservationHandler = () => {
    router.push({
      pathname: `/tour/${tourPackage?.tour?.id}/reservation/edit/step-1`,
      params: {
        transactionId,
        tourPackage: JSON.stringify(tourPackage),
      },
    });
  };

  return (
    <>
      {(status.step?.name as string) === "REQUEST" && status.isActive && (
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

      {(status?.step?.name as string) === "SUCCESSFUL" && (
        <>
          <Divider />
          <Pressable
            style={styles.buttonContainer}
            onPress={() => router.push(`tour/transaction/successReceipt?id=${transactionId}`)}>
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
