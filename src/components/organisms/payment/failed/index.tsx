import React from "react";
import Container from "@atoms/container";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import WhiteSpace from "@atoms/white-space";

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
        <WhiteSpace size={15} />
        <Text>{tr("unsuccessful payment")}</Text>
        <WhiteSpace size={5} />
        <Text caption type="grey2" style={styles.subTitle}>
          {tr(
            "your payment has been failed, to continue the process and view receipt click the return button."
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

export default FailedPayment;
