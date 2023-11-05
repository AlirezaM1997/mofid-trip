import { Button } from "@rneui/themed";
import Text from "@src/components/atoms/text";
import WhiteSpace from "@src/components/atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { useIsAuthenticated } from "@src/hooks/user";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import { SECONDARY_COLOR } from "@src/theme";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

const Authentication = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();
  const { protectedScreen } = useLocalSearchParams();

  const handleLogin = (address: string) => router.push(address);

  if (!isAuthenticated) {
    dispatch(setRedirectToScreenAfterLogin(protectedScreen));
  }
  return (
    <View style={style.container}>
      <ImageBackground
        style={style.imageBackground2}
        source={require("@assets/image/user-with-phone.jpg")}
      />
      <WhiteSpace size={10} />
      <Text variant="heading1" style={{ textAlign: "center" }}>
        {tr("let's start and login to mofid trip")}
      </Text>
      <Text variant="body2" style={{ textAlign: "center" }}>
        {tr(
          "To reserve the places and use the application, you must log in or register in the first step, otherwise you will not be able to do any activity."
        )}
      </Text>
      <WhiteSpace size={10} />
      <View style={style.buttonContainer}>
        <Button
          size="lg"
          color="secondary"
          containerStyle={style.buttonItem}
          onPress={() => handleLogin("userLogin")}>
          {tr("Login")}
        </Button>
        <Button
          size="lg"
          color="secondary"
          type="outline"
          containerStyle={[style.buttonItem]}
          onPress={() => handleLogin("userLogin")}>
          {tr("Register")}
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
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
