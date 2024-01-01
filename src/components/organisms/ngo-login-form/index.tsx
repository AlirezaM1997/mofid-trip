import { Button, Text, useTheme } from "@rneui/themed";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import React, { useEffect, useState } from "react";
import { useCreateLoginMutation } from "@src/gql/generated";
import { Pressable, StyleSheet, View } from "react-native";
import CountryPicker from "@src/components/modules/country-picker";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";

const NgoLoginForm = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [phone, setPhone] = useState("");
  const [callingCode, setCallingCode] = useState("+98");
  const [login, { loading, data, error }] = useCreateLoginMutation();
  const sendToApiPhone = phone[0] === "0" ? phone.substring(1) : phone;

  const handlePress = () => {
    login({
      variables: {
        dataNgo: {
          phoneNumber: callingCode + sendToApiPhone,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data && data.createLogin.statusCode === 200) {
      router.push({
        pathname: "/SMSVerification",
        params: {
          phone: callingCode + sendToApiPhone,
        },
      });
    }
  }, [loading, data]);

  return (
    <>
      <View style={style.container}>
        <Container>
          <WhiteSpace size={32} />
          <Text heading1>{tr("log in, register as a collection")}</Text>
          <WhiteSpace size={10} />
          <Text caption style={{ color: theme.colors.grey2 }}>
            {tr("enter your mobile number to log in and create an account on mofidtrip")}
          </Text>
          <WhiteSpace size={24} />
          <CountryPicker
            callingCode={callingCode}
            setCallingCode={setCallingCode}
            value={phone}
            setValue={setPhone}
          />
        </Container>
      </View>
      <Container>
        <Pressable style={style.bottomTextContainer} onPress={() => router.replace("/user-login")}>
          <Text style={style.registerText}>{tr("log in as an individual")}</Text>
        </Pressable>

        <WhiteSpace size={16} />
        <Button
          size="lg"
          onPress={handlePress}
          disabled={loading || phone?.length < 5}
          loading={loading}>
          {tr("Next")}
        </Button>
        <WhiteSpace size={10} />
      </Container>
    </>
  );
};

const style = StyleSheet.create({
  container: { flex: 1 },
  bottomTextContainer: {
    display: "flex",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    textAlign: "center",
    textDecorationColor: "#000",
    textDecorationLine: "underline",
  },
  divider: {
    height: "70%",
    borderWidth: 0.5,
    borderColor: "grey",
  },
});

export default NgoLoginForm;
