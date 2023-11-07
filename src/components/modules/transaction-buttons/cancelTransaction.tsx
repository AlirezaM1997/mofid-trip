import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { Pressable, StyleSheet } from "react-native";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import { BottomSheet, Button, Divider, Text } from "@rneui/themed";

type PropsType = {
  isVisible: boolean;
  transactionId: string;
  cancelHandler: () => void;
  apiTransactionStep: string;
  setIsVisible: (t: boolean) => void;
  setStatus: (status: { step: string | number; isActive: boolean }) => void;
};

const CancelTransaction = ({ cancelHandler, isVisible, setIsVisible }: PropsType) => {
  const { tr } = useTranslation();

  const handleCancel = async () => {
    cancelHandler();
    setIsVisible(false);
  };

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Pressable style={styles.close} onPress={() => setIsVisible(false)}>
        <Feather name="x-circle" size={24} color="transparent" />
        <Text heading1>{tr("Delete")}</Text>
        <Feather name="x-circle" size={24} color="black" />
      </Pressable>
      <Divider />
      <View style={styles.contentContainerStyle}>
        <Container>
          <WhiteSpace size={10} />
          <Text style={styles.centerText} body1>
            {tr("Are you sure to cancel?")}
          </Text>
          <WhiteSpace size={10} />
          <Button onPress={handleCancel}>{tr("Yes")}</Button>
          <WhiteSpace size={10} />
        </Container>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  close: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    backgroundColor: "#fff",
  },
  contentContainerStyle: { backgroundColor: "#fff" },
  centerText: {
    textAlign: "center",
  },
});

export default CancelTransaction;
