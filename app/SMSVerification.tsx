import { Button } from "@rneui/themed";
import CountDownTimer from "@src/components/atoms/count-down-timer";
import Text from "@src/components/atoms/text";
import { useDispatch, useSelector } from "react-redux";
import Container from "@src/components/atoms/container";
import WhiteSpace from "@src/components/atoms/white-space";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "@src/theme";
import { useLoginMutation, useUserCheckSmsVerificationCodeMutation, useUserDetailLazyQuery } from "@src/gql/generated";
import { setLoginData, setUserDetail } from "@src/slice/user-slice";
import { RootState } from "@src/store";
import { NetworkStatus } from "@apollo/client";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import OtpInput from "@src/components/modules/otp-input";
import { router, useLocalSearchParams } from "expo-router";

const SMSVerificationScreen = ({ route }) => {
  const dispatch = useDispatch();
  const countDownTimerRef = useRef();
  const { phone } = useLocalSearchParams();
  const [canRequestCode, setCanRequestCode] = useState(false);
  const { redirectToScreenAfterLogin } = useSelector((state: RootState) => state.navigationSlice);
  const { loginData } = useSelector((state: RootState) => state.userSlice);
  const [login, { loading, data, error }] = useLoginMutation();
  const [userCheckSmsVerificationCode, { loading: loadingChecking, data: dataChecking, error: errorChecking }] = useUserCheckSmsVerificationCodeMutation();
  const [_, { loading: loadingUserDetail, data: dataUserDetail, error: errorUserDetail, refetch, networkStatus }] = useUserDetailLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const handleCountDownTimerOnEnd = () => {
    setCanRequestCode(true);
  };

  const handleBack = () => router.back();

  const onComplete = (text) => {
    userCheckSmsVerificationCode({
      variables: {
        code: parseInt(text),
        phoneNumber: phone as string,
      },
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
      if (dataChecking.userCheckSmsVerificationCode.statusCode === 200) {
        dispatch(setLoginData(dataChecking.userCheckSmsVerificationCode));
      } else {
        // toast.error(dataChecking.userCheckSmsVerificationCode.message);
      }
    }
  }, [loadingChecking, dataChecking]);

  useEffect(() => {
    if (loginData?.token) refetch();
  }, [loginData?.token]);

  useEffect(() => {
    if (networkStatus === NetworkStatus.ready && dataUserDetail) {
      if (redirectToScreenAfterLogin) {
        dispatch(setUserDetail(dataUserDetail.userDetail));
        router.push(redirectToScreenAfterLogin);
      } else {
        // router.push("HomeScreen")
      }
    }
  }, [networkStatus, dataUserDetail]);

  useEffect(() => {
    if (!loading && data && data.login.status === "OK") {
      setCanRequestCode(false);
    }
  }, [loading, data]);

  return (
    <>
      {loadingChecking || (networkStatus === NetworkStatus.loading && <LoadingIndicator />)}
      <View style={style.container}>
        {canRequestCode ? (
          <Text>Try resend code again</Text>
        ) : (
          <CountDownTimer onEnd={handleCountDownTimerOnEnd} ref={countDownTimerRef} initialValue={120} style={style.timerText} />
        )}
        <WhiteSpace size={20} />
        <Container size={10}>
          <Text style={style.text} variant="caption">
            Verification code has been sent, enter it. If you do not receive the code, hit send again
          </Text>
          <WhiteSpace size={10} />
          <Button type="clear" disabled={!canRequestCode} onPress={handleRequestAgain}>
            Resend the code
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
          <Text style={style.phone} variant="body1">
            {phone}
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
