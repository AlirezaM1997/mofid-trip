import React from "react";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";

const SuccessPayment = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { id, type } = useLocalSearchParams();
  return (
    <BottomButtonLayout
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      buttons={[
        <Button
          onPress={() =>
            router.push({
              pathname:
                type === "tour"
                  ? `tour/transaction/successReceipt`
                  : `host/transaction/successReceipt`,
              params: { id },
            })
          }>
          {tr("view receipt")}
        </Button>,
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

export default SuccessPayment;
