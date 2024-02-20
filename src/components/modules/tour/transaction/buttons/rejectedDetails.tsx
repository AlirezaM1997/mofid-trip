import React from "react";
import Container from "@atoms/container";
import { ImageBackground, StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Text } from "@rneui/themed";

const RejectedDetails = ({ isVisible, setIsVisible, transaction }) => {
  const { tr } = useTranslation();

  return (
    <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <Container style={styles.container}>
        <ImageBackground
          style={styles.rejectIcon}
          imageStyle={{ resizeMode: "contain" }}
          source={require("@assets/image/rejectIcon.svg")}
        />
        <Text heading2 center>
          {tr("your request was rejected")}
        </Text>
        <Text center>{transaction.description}</Text>
        <Button type="outline" onPress={() => setIsVisible(false)}>
          {tr("back")}
        </Button>
      </Container>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    textAlign: "center",
  },
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default RejectedDetails;
