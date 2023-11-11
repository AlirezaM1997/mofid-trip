import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { Button, Text, useTheme } from "@rneui/themed";

const SuccessPayment = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <Container style={styles.container}>
      <View style={styles.contentContainer}>
        <AntDesign
          size={48}
          color="black"
          name="checkcircle"
          style={{ color: theme.colors.success }}
        />

        <View style={styles.titleContainer}>
          <Text>{tr("payment was successful")}</Text>
          <Text caption type="grey2" style={styles.subTitle}>
            {tr(
              "your payment has been successfully completed, to continue the process and view receipt click the return button."
            )}
          </Text>
        </View>
      </View>

      <View style={styles.butContainer}>
        <Button containerStyle={styles.buttonStyle} onPress={() => router.push("/receipt")}>
          {tr("view receipt")}
        </Button>
        <Button containerStyle={styles.buttonStyle} onPress={() => router.back()}>
          {tr("back")}
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    gap: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
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
    width: "100%",
  },
});

export default SuccessPayment;
