import { Text } from "@rneui/themed";
import { Button } from "@rneui/themed";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import React, { useEffect, useState } from "react";
import { useCreateLoginMutation } from "@src/gql/generated";
import { Pressable, StyleSheet, View } from "react-native";
import CountryPicker from "@src/components/modules/country-picker";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";

const Registration = ({ type }: { type: "dataUser" | "dataNgo" }) => {
  const { tr } = useTranslation();
  const [phone, setPhone] = useState("");
  const [callingCode, setCallingCode] = useState("+964");
  const [login, { loading, data, error }] = useCreateLoginMutation();

  const handlePress = () => {
    login({
      variables: {
        dataUser: {
          phoneNumber: callingCode + phone,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data && data.createLogin.statusCode === 200) {
      router.push({
        pathname: "/SMSVerification",
        params: {
          phone: callingCode + phone,
        },
      });
    }
  }, [loading, data]);

  return (
    <>
      <View style={style.container}>
        <Container>
          <WhiteSpace size={10} />
          <Text variant="heading2">{tr("log in , sign up")}</Text>
          <Text variant="body1">
            To enter and create an account in Mofid Trip, enter your mobile number to enter the
            program
          </Text>
          <WhiteSpace size={10} />
          <CountryPicker
            callingCode={callingCode}
            setCallingCode={setCallingCode}
            value={phone}
            setValue={setPhone}
          />
        </Container>
      </View>
      <Container>
        <Pressable style={style.bottomTextContainer} onPress={() => router.push("/login")}>
          <Text>Haven't registered yet? </Text>
          <Text style={style.registerText}>Register</Text>
        </Pressable>

        <WhiteSpace size={10} />
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

export default Registration;
