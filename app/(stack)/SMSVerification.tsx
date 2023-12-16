import { Button } from "@rneui/themed";
import CountDownTimer from "@src/components/atoms/count-down-timer";
import { Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "@src/theme";
import { useCreateLoginMutation, useUserGetTokenMutation } from "@src/gql/generated";
import { RootState } from "@src/store";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import OtpInput from "@src/components/modules/otp-input";
import { router, useLocalSearchParams } from "expo-router";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import Toast from "react-native-toast-message";
import { setLoginData } from "@src/slice/auth-slice";

const SMSVerificationScreen = () => {
  const { tr } = useTranslation();
  const dispatch = useDispatch();
  const countDownTimerRef = useRef();
  const { phone } = useLocalSearchParams();
  const [canRequestCode, setCanRequestCode] = useState(false);
  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);
  const [login, { loading, data, error }] = useCreateLoginMutation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [
    userCheckSmsVerificationCode,
    { loading: loadingChecking, data: dataChecking, error: errorChecking },
  ] = useUserGetTokenMutation();

  const handleCountDownTimerOnEnd = () => {
    setCanRequestCode(true);
  };

  const handleBack = () => router.back();

  const onComplete = text => {
    userCheckSmsVerificationCode({
      variables: {
        code: parseInt(text),
        phoneNumber: phone as string,
      },
    }).then(({ data, errors }) => {
      if (data.userGetToken.statusCode === 404) {
        Toast.show({
          type: "error",
          text1: tr("Error"),
          text2: data.userGetToken.message,
        });
      }
    });
  };

  const handleRequestAgain = () => {
    login({
      variables: {
        dataUser: {
          phoneNumber: phone as string,
        },
      },
    });
  };

  useEffect(() => {
    if (!loadingChecking && dataChecking) {
      if (dataChecking.userGetToken.statusCode === 200) {
        console.log('====', dataChecking.userGetToken)
        dispatch(setLoginData(dataChecking.userGetToken));
        router.push(redirectToScreenAfterLogin ? redirectToScreenAfterLogin : "/");
      } else {
        Toast.show({
          type: "error",
          text1: tr("Error"),
          text2: dataChecking.userGetToken.message,
        });
      }
    }
  }, [loadingChecking, dataChecking]);

  useEffect(() => {
    if (!loading && data && data.createLogin.status === "OK") {
      setCanRequestCode(false);
    }
  }, [loading, data]);

  return (
    <>
      {loadingChecking && <LoadingIndicator />}
      <View style={style.container}>
        <CountDownTimer
          onEnd={handleCountDownTimerOnEnd}
          ref={countDownTimerRef}
          initialValue={120}
          style={style.timerText}
        />
        <WhiteSpace size={20} />
        <Container size={10}>
          <Text center type="grey2">
            {tr(
              "Verification code has been sent, enter it. If you do not receive the code, hit send again"
            )}
          </Text>
          <WhiteSpace size={10} />
          <Button type="clear" disabled={!canRequestCode} onPress={handleRequestAgain}>
            {tr("Resend the code")}
          </Button>
          <WhiteSpace size={10} />
        </Container>
        <WhiteSpace size={10} />
        <OtpInput onComplete={onComplete} />
        {/* <OtpInput
          numberOfDigits={4}
          onTextChange={handleChangeOTP}
          focusColor={PRIMARY_COLOR}
          theme={{
            containerStyle: {
              width: 260,
            },
            pinCodeContainerStyle: {
              width: 60,
              height: 60,
            },
          }}
        /> */}
        <WhiteSpace size={10} />
        <Pressable style={style.editContainer} onPress={handleBack}>
          <Feather name="edit" size={20} color={PRIMARY_COLOR} />
          <Text style={style.phone} body1>
            {localizeNumber(phone as string)}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  timerText: {
    fontSize: 40,
  },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  phone: {
    fontWeight: "bold",
  },
  text: {
    color: "#ADAFAE",
    textAlign: "center",
  },
});

export default SMSVerificationScreen;
