import { Button } from "@rneui/themed";
import CountDownTimer from "@src/components/atoms/count-down-timer";
import { Text } from "@rneui/themed";
import { useSelector } from "react-redux";
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
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import Toast from "react-native-toast-message";
import { useSession } from "@src/context/auth";
import { HEIGHT } from "@src/constants";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import { useDispatch } from "react-redux";

const SMSVerificationScreen = () => {
  const dispatch = useDispatch();
  const { signIn, session } = useSession();
  const { tr } = useTranslation();
  const { phone } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [resetTimer, setResetTimer] = useState(false);
  const [canRequestCode, setCanRequestCode] = useState(false);

  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);

  const [login, { loading, data }] = useCreateLoginMutation();
  const [userCheckSmsVerificationCode, { loading: loadingChecking }] = useUserGetTokenMutation();

  const handleCountDownTimerOnEnd = () => {
    setResetTimer(false);
    setCanRequestCode(true);
  };

  const handleBack = () => router.back();

  const onComplete = async (text: string) => {
    const { data } = await userCheckSmsVerificationCode({
      variables: {
        code: parseInt(text),
        phoneNumber: phone as string,
      },
    });

    // اگه کد وارد شده درست نباشه
    if (data?.userGetToken?.statusCode === 404) {
      Toast.show({
        type: "error",
        text1: tr("Error"),
        text2: data.userGetToken.message as string,
        topOffset: HEIGHT / 4,
      });
    }
    if (data?.userGetToken?.statusCode === 200) {
      signIn({
        token: data?.userGetToken?.token,
        refreshToken: data?.userGetToken?.refreshToken,
        metadata: data?.userGetToken?.metadata,
      });
    } else {
      Toast.show({
        type: "error",
        text1: tr("Error"),
        text2: data?.userGetToken?.message as string,
        topOffset: HEIGHT / 4,
      });
    }
  };

  const handleRequestAgain = async () => {
    const { data } = await login({
      variables: {
        dataUser: {
          phoneNumber: phone as string,
        },
      },
    });
    if (data?.createLogin?.status === "OK") {
      setCanRequestCode(false);
      setResetTimer(true);
    }
  };

  useEffect(() => {
    if (!loading && data && data?.createLogin?.status === "OK") {
      setCanRequestCode(false);
    }
  }, [loading, data]);

  useEffect(() => {
    if (session) {
      if (redirectToScreenAfterLogin) {
        dispatch(setRedirectToScreenAfterLogin(""));
        router.replace(redirectToScreenAfterLogin);
      } else {
        router.replace("/");
      }
    }
  }, [session]);

  return (
    <>
      {loadingChecking && <LoadingIndicator />}
      <View style={style.container}>
        <CountDownTimer
          initialValue={120}
          resetTimer={resetTimer}
          onEnd={handleCountDownTimerOnEnd}
        />
        <WhiteSpace size={20} />
        <Container size={10}>
          <Text center type="grey2">
            {tr(
              "Verification code has been sent, enter it. If you do not receive the code, hit send again"
            )}
          </Text>
          <WhiteSpace size={10} />
          <Button
            type="clear"
            loading={loading}
            disabled={!canRequestCode}
            onPress={handleRequestAgain}>
            {tr("Resend the code")}
          </Button>
          <WhiteSpace size={10} />
        </Container>
        <WhiteSpace size={10} />
        <OtpInput onComplete={onComplete} />
        <WhiteSpace size={10} />
        <Pressable style={style.editContainer} onPress={handleBack}>
          <Feather name="edit" size={20} color={PRIMARY_COLOR} />
          <Text bold style={style.phone}>
            {localizeNumber(phone as string)}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  editContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  phone: {
    writingDirection: "ltr",
  },
  text: {
    color: "#ADAFAE",
    textAlign: "center",
  },
});

export default SMSVerificationScreen;
