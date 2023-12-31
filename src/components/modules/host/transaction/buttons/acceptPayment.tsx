import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import { BottomSheet, Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import ButtonRow from "@modules/button-rows";

type PropsType = {
  isVisible: boolean;
  purchaseLoading: boolean;
  purchaseHandler: () => void;
  setIsVisible: (t: boolean) => void;
};

const AcceptPayment = ({
  isVisible,
  setIsVisible,
  purchaseHandler,
  purchaseLoading,
}: PropsType) => {
  const { tr } = useTranslation();

  return (
    <BottomSheet
      containerStyle={styles.bottomSheetContainer}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}>
      <Container style={styles.container}>
        <View style={styles.textContainer}>
          <Text heading2 style={styles.headerText}>
            {tr("Are you sure about the payment?")}
          </Text>
          <Text caption>{tr("after paying the host fee, your reservation will be finalized")}</Text>
        </View>

        <ButtonRow>
          <Button type="outline" onPress={() => setIsVisible(false)}>
            {tr("cancel payment")}
          </Button>
          <Button loading={purchaseLoading} onPress={purchaseHandler}>
            {tr("pay")}
          </Button>
        </ButtonRow>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: { width: "100%" },
  textContainer: { gap: 8 },
  headerText: { textAlign: "center" },
  container: { margin: "auto", gap: 24 },
  button: { width: "50%" },
});

export default AcceptPayment;
