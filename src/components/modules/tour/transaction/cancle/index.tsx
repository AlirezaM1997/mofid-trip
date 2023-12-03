import React, { useState } from "react";
import { Pressable } from "react-native";
import Container from "@atoms/container";
import Toast from "react-native-toast-message";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Text } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { TransactionStatusEnum, useTourTransactionEditMutation } from "@src/gql/generated";

const CancelTransaction = ({ button }) => {
  const { tr } = useTranslation();
  const { transactionId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  const [cancel] = useTourTransactionEditMutation();

  const cancelRequestHandler = async () => {
    const { data } = await cancel({
      variables: {
        data: {
          transactionId: transactionId as string,
          status: { step: TransactionStatusEnum.Request, isActive: false },
        },
      },
    });

    if (data?.tourTransactionEdit.statusCode === 200) {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("your request canceled"),
      });
    }
    router.push("reservation");
  };

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>{button}</Pressable>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Container style={styles.container}>
          <View style={styles.textContainer}>
            <Text heading2 style={styles.headerText}>
              {tr("are you sure to cancel the request?")}
            </Text>
            <Text caption>
              {tr("by canceling the request, your reservation process will be canceled")}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              type="outline"
              onPress={() => setIsVisible(false)}
              containerStyle={styles.button}>
              {tr("cancel")}
            </Button>
            <Button onPress={cancelRequestHandler} containerStyle={styles.button}>
              {tr("confirmation")}
            </Button>
          </View>
        </Container>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: { width: "100%" },
  textContainer: { gap: 8 },
  headerText: { textAlign: "center" },
  container: { margin: "auto", gap: 24 },
  btnContainer: {
    gap: 7,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: { width: "50%" },
});

export default CancelTransaction;
