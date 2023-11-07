import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import { BottomSheet, Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ApolloCache, DefaultContext, MutationFunctionOptions } from "@apollo/client";
import { Exact, TourPurchaseAddInputData, TourPurchaseAddMutation } from "@src/gql/generated";

type PropsType = {
  isVisible: boolean;
  setIsVisible: (t: boolean) => void;
  purchaseHandler: () => void;
};

const AcceptPayment = ({ isVisible, setIsVisible, purchaseHandler }: PropsType) => {
  const { tr } = useTranslation();

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Container style={styles.container}>
        <View style={styles.textContainer}>
          <Text heading2 style={styles.headerText}>
            {tr("Are you sure about the payment?")}
          </Text>
          <Text caption>{tr("After paying the tour fee, your reservation will be finalized")}</Text>
        </View>

        <View style={styles.btnContainer}>
          <Button type="outline" onPress={() => purchaseHandler()} containerStyle={styles.button}>
            {tr("cancel payment")}
          </Button>
          <Button onPress={() => setIsVisible(false)} containerStyle={styles.button}>
            {tr("pay")}
          </Button>
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
    gap: 7,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: { width: "50%" },
});

export default AcceptPayment;
