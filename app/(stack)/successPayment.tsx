import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { Button, Text, useTheme } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";

const SuccessPayment = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <BottomButtonLayout
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      buttons={[
        <View style={styles.butContainer}>
          <Button containerStyle={styles.buttonStyle} onPress={() => router.push("/receipt")}>
            {tr("view receipt")}
          </Button>
          <Button containerStyle={styles.buttonStyle} onPress={() => router.back()}>
            {tr("back")}
          </Button>
        </View>,
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
  butContainer: {
    gap: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    width: "50%",
  },
});

export default SuccessPayment;
