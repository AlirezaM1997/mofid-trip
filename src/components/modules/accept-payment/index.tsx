import { Text } from "@rneui/themed";
import React, { useState } from "react";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import { BottomSheet, Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";

const AcceptPayment = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Container style={styles.container}>
        <View style={styles.textContainer}>
          <Text variant="heading2" style={styles.headerText}>
            {tr("Are you sure about the payment?")}
          </Text>
          <Text variant="caption">
            {tr("After paying the tour fee, your reservation will be finalized")}
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <Button type="outline">{tr("cancel payment")}</Button>
          <Button>{tr("pay")}</Button>
        </View>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  textContainer: { gap: 8 },
  headerText: { textAlign: "center" },
  container: { margin: "auto", gap: 24 },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
});

export default AcceptPayment;
