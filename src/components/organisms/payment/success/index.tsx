import React from "react";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Button, Text, useTheme } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";

const SuccessPayment = ({ handlePress }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      buttons={[
        <Button onPress={handlePress}>{tr("view receipt")}</Button>,
        <Button type="outline" onPress={() => router.push("/")}>
          {tr("return to home")}
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
