import { Button } from "@rneui/themed";
import { Text } from "@rneui/themed";
import WhiteSpace from "@src/components/atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { SECONDARY_COLOR } from "@src/theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import Container from "@atoms/container";

const Authentication = () => {
  const { tr } = useTranslation();

  return (
    <Container style={style.container}>
      <Text heading2>{tr("login or register")}</Text>
      <Pressable onPress={() => router.push("/user-login")}>
        <WhiteSpace />
        <Text caption type="grey2">
          {tr("to access more possibilities to create tours or hosts")}
        </Text>
        <Text caption type="grey2">
          {tr("and booking them in mofidtrip")} <Text caption>{tr("enter")}</Text>{" "}
          <Text caption type="grey2">
            {tr("or")}
          </Text>{" "}
          <Text caption>{tr("Register")}</Text> <Text caption>{tr("do")}</Text>
        </Text>
        <WhiteSpace size={24} />
      </Pressable>
      <Button
        containerStyle={{ width: "100%" }}
        type="solid"
        onPress={() => router.push("/user-login")}>
        {tr("log in, sign up")}
      </Button>
    </Container>
  );
};

const style = StyleSheet.create({
  container: {
    margin: "auto",
    alignItems: "center",
  },
  imageBackground2: {
    width: 174,
    height: 238,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 26,
    gap: 10,
  },
  buttonItem: {
    flex: 1,
  },
  registerButtonStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
  },
  registerTitleStyle: {
    color: SECONDARY_COLOR,
  },
});

export default Authentication;
