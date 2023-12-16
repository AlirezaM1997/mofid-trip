import * as Yup from "yup";
import { Formik } from "formik";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useEffect, useState } from "react";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Feather } from "@expo/vector-icons";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import useTranslation from "@src/hooks/translation";
import { router, useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import BottomButtonLayout from "@components/layout/bottom-button";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import HostTransactionDateTab from "@organisms/host-transaction/date";
import { setTourCreateActiveStep } from "@src/slice/tour-create-slice";
import { setHostTransactionData } from "@src/slice/host-transaction-slice";
import HostTransactionTab from "@modules/virtual-tabs/host-transaction-tabs";
import HostTransactionCapacityTab from "@organisms/host-transaction/capacity";
import HostTransactionConfirmData from "@organisms/host-transaction/confirm-data";
import { TourGenderEnum, useProjectTransactionAddMutation } from "@src/gql/generated";

const initialValues = {
  guests: {
    guestNumber: null,
    childAccept: false,
    gender: TourGenderEnum.Both,
  },
  dateStart: "",
  dateEnd: "",
};

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [isVisibleExit, setIsVisibleExit] = useState(false);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [exitElement, setExitElement] = useState<"HardwareBackButton" | "BackButton">();
  const navigation = useNavigation();
  const { activeStep } = useSelector((state: RootState) => state.hostTransactionSlice);
  const [submit, { loading }] = useProjectTransactionAddMutation();

  const validationSchema = Yup.object().shape({
    dateStart: Yup.date().required(tr("Required")),
    dateEnd: Yup.date().required(tr("Required")),
    guests: Yup.object().shape({
      guestNumber: Yup.number()
        .positive(tr("capacity is required"))
        .required(tr("capacity is required")),
      gender: Yup.string(),
      childAccept: Yup.boolean(),
    }),
  });

  const handleOpen = () => setIsVisibleExit(true);
  const handleClose = () => setIsVisibleExit(false);

  const handleNext = () => dispatch(setHostTransactionData(activeStep + 1));
  const handlePrev = () => dispatch(setHostTransactionData(activeStep - 1));

  const handleSubmit = async values => {
    const { data } = await submit({
      variables: {
        data: values,
      },
    });
    if (data.projectTransactionAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });
      setIsVisibleFinish(true);
    }
  };

  // ########## START OF BACK BUTTON HANDLING ##########
  const handleExit = () => {
    if (exitElement === "BackButton") {
      router.back();
      router.back();
    } else {
      router.back();
    }
  };

  const handleHeaderBackButtonPress = () => {
    handleOpen();
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("BackButton");
  };

  const beforeRemoveHandler = e => {
    e.preventDefault();
    window.history.pushState(null, "", "/tour/create");
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("HardwareBackButton");
    handleOpen();
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveHandler);
    return () => {
      dispatch(setTourCreateActiveStep(1));
      navigation.removeListener("beforeRemove", beforeRemoveHandler);
    };
  }, []);

  useEffect(() => {
    if (!isVisibleExit) {
      navigation.addListener("beforeRemove", beforeRemoveHandler);
    }
  }, [isVisibleExit]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={handleHeaderBackButtonPress}>
          <Feather name="arrow-right" size={24} color="black" style={{ marginRight: 12 }} />
        </Pressable>
      ),
    });
  }, []);
  // ########## END OF BACK BUTTON HANDLING ##########

  useEffect(() => {
    const headerTitle = {
      1: tr("Host Capacity"),
      2: tr("Host Date"),
      3: tr("Final Details"),
    }[activeStep];
    navigation.setOptions({
      headerTitle: headerTitle,
    });
  }, [activeStep]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ values, errors, handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button
              onPress={activeStep === 3 ? handleSubmit : handleNext}
              disabled={loading}
              loading={loading}>
              {activeStep === 3 ? tr("Submit") : tr("Next")}
            </Button>,
            <Button
              type="outline"
              color="secondary"
              disabled={activeStep === 1}
              onPress={handlePrev}>
              {tr("Previous")}
            </Button>,
          ]}>
          <HostTransactionTab />
          <WhiteSpace />

          <Container>
            {activeStep === 1 && <HostTransactionCapacityTab />}
            {activeStep === 2 && <HostTransactionDateTab />}
            {activeStep === 3 && <HostTransactionConfirmData />}
          </Container>

          <BottomSheet isVisible={isVisibleExit} onBackdropPress={handleClose}>
            <Container>
              <ImageBackground
                style={styles.rejectIcon}
                imageStyle={{ resizeMode: "contain" }}
                source={require("@assets/image/rejectIcon.svg")}
              />
              <Text heading1 center>
                آیا از خروج از این صفحه اطمینان دارید؟
              </Text>
              <Text center>در صورت خروج از این صفحه اطلاعات این فرم ها پاک خواهد شد</Text>
              <WhiteSpace />
              <ButtonRow>
                <Button onPress={handleExit}>خارج شدن</Button>
                <Button onPress={handleClose}>{tr("Stay")}</Button>
              </ButtonRow>
            </Container>
          </BottomSheet>

          <BottomSheet isVisible={isVisibleFinish}>
            <Container>
              <ImageBackground
                style={styles.rejectIcon}
                imageStyle={{ resizeMode: "contain" }}
                source={require("@assets/image/check.svg")}
              />
              <Text center heading2 bold>
                {tr("Your request to create a tour has been successfully registered")}
              </Text>
              <Text center>
                {tr(
                  "Wait less than 48 hours for your tour to be registered by trip's helpful support and displayed to travelers."
                )}
              </Text>
              <WhiteSpace />
              <ButtonRow>
                <Button
                  onPress={() => {
                    router.push("/tour/management");
                    setIsVisibleFinish(false);
                  }}
                  color="secondary"
                  type="outline">
                  {tr("Tour Management")}
                </Button>
                <Button
                  onPress={() => {
                    router.push("/");
                    setIsVisibleFinish(false);
                  }}>
                  {tr("Return to home")}
                </Button>
              </ButtonRow>
            </Container>
          </BottomSheet>
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default Screen;
