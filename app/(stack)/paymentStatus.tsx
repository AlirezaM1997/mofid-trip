import React from "react";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Button, Text, useTheme } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";

const SuccessPayment = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { id } = useLocalSearchParams();
  return (
    <BottomButtonLayout
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      buttons={[
        <Button onPress={() => router.push(`/successReceipt?id=${id}`)}>{tr("view receipt")}</Button>,
      ]}>
      <Container style={styles.container}>
        <AntDesign
          size={48}
          color="black"
          name="checkcircle"
          style={{ color: theme.colors.success }}
        />
        <Text>{tr("payment was successful")}</Text>
        <Text caption type="grey2" style={styles.subTitle}>
          {tr(
            "your payment has been successfully completed, to continue the process and view receipt click the return button."
          )}
        </Text>
      </Container>
    </BottomButtonLayout>
  );
};
const FailedPayment = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { id } = useLocalSearchParams();

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      buttons={[
        <Button onPress={() => router.push(`/failedReceipt?id=${id}`)}>
          {tr("view receipt")}
        </Button>,
      ]}>
      <Container style={styles.container}>
        <AntDesign
          size={48}
          color="black"
          name="closecircle"
          style={{ color: theme.colors.error }}
        />
        <Text>{tr("unsuccessful payment")}</Text>
        <Text caption type="grey2" style={styles.subTitle}>
          {tr(
            "your payment has been failed, to continue the process and view receipt click the return button."
          )}
        </Text>
      </Container>
    </BottomButtonLayout>
  );
};

const PaymentStatus = () => {
  const { status } = useLocalSearchParams();

  return status === "OK" ? <SuccessPayment /> : <FailedPayment />;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    textAlign: "center",
  },
});

export default PaymentStatus;
