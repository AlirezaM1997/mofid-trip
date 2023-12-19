import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import ButtonRow from "@modules/button-rows";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import DetailsTab from "@organisms/tour-create/details-tab";
import { BottomSheet } from "@rneui/themed";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { setTourCreateActiveStep } from "@src/slice/tour-create-slice";
import { RootState } from "@src/store";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Platform, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Feather } from "@expo/vector-icons";
import {
  ProjectGenderEnum,
  TourGenderEnum,
  useProjectAddMutation,
  useTourAddMutation,
} from "@src/gql/generated";
import { Formik } from "formik";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { setHostCreateActiveStep } from "@src/slice/host-create-slice";
import TabDetails from "@organisms/host-create/details-tab";
import TabHostType from "@organisms/host-create/host-type";
import TabAddress from "@organisms/host-create/address";
import TabCapacity from "@organisms/host-create/capacity";
import TabDate from "@organisms/host-create/date";
import TabPrice from "@organisms/host-create/price";
import TabImage from "@organisms/host-create/images";
import { CommonActions } from "@react-navigation/routers";
import TabFaclities from "@organisms/host-create/facilities";

const initialValues = {
  name: "",
  description: "",
  dateStart: null,
  dateEnd: null,
  accommodation: {
    province: null,
    city: null,
    address: null,
    lat: null,
    lng: null,
    base64Images: [],
  },
  capacity: {
    capacityNumber: null,
    gender: ProjectGenderEnum.Both,
    childAccept: false,
  },
  price: null,
  discount: 0,
  categories: [],
  facilities: [],
};

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [isVisibleExit, setIsVisibleExit] = useState(false);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [exitElement, setExitElement] = useState<"HardwareBackButton" | "BackButton">();
  const navigation = useNavigation();
  const { activeStep } = useSelector((state: RootState) => state.hostCreateSlice);
  const [submit, { loading }] = useProjectAddMutation();
  const [isVisible, setIsVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(tr("Title is required")),
    description: Yup.string().nullable(),

    categories: Yup.array()
      .required("This field is required")
      .min(1, "At least one item is required"),

    accommodation: Yup.object().shape({
      province: Yup.string().required(tr("Province is required")),
      city: Yup.string().required(tr("City is required")),
      address: Yup.string().required(tr("Address is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    capacity: Yup.object().shape({
      capacityNumber: Yup.number().positive().required(tr("Capacity is required")),
      gender: Yup.string(),
      childAccept: Yup.boolean(),
    }),

    dateStart: Yup.date().required(tr("Required")),
    dateEnd: Yup.date().required(tr("Required")),

    price: Yup.number()
      .min(0, tr("Only positive numbers acceptable"))
      .typeError(tr("Only number acceptable"))
      .required(tr("Required")),
    discount: Yup.number()
      .required(tr("Required"))
      .max(100, tr("Discount can not be greater than 100")),
  });

  const handleOpen = () => setIsVisibleExit(true);
  const handleClose = () => setIsVisibleExit(false);

  const handleNext = () => dispatch(setHostCreateActiveStep(activeStep + 1));
  const handlePrev = () => dispatch(setHostCreateActiveStep(activeStep - 1));

  const handleSubmit = async values => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          price: +values.price,
          discount: +values.discount,
          capacity: { ...values.capacity, capacityNumber: +values.capacity.capacityNumber },
        },
      },
    });
    if (data.projectAdd.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

  const routeHandler = route => {
    if (Platform.OS === "web") {
      let currentUrl = "/";
      history.replaceState({ url: currentUrl }, document.title, currentUrl);
      router.push(route);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ key: `${route}/index`, name: `${route}/index` }],
        })
      );
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
      dispatch(setHostCreateActiveStep(1));
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
      1: tr("Details"),
      2: tr("Host Type"),
      3: tr("Address"),
      4: tr("Capacity"),
      5: tr("Date"),
      6: tr("Price"),
      7: tr("Images"),
      8: tr("Facilities"),
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
              onPress={activeStep === 8 ? handleSubmit : handleNext}
              disabled={loading}
              loading={loading}>
              {activeStep === 8 ? tr("Submit") : tr("Next")}
            </Button>,
            <Button
              type="outline"
              color="secondary"
              disabled={activeStep === 1}
              onPress={handlePrev}>
              {tr("Previous")}
            </Button>,
          ]}>
          <HostCreateTabs />
          <WhiteSpace />

          <Container>
            {activeStep === 1 && <TabDetails />}
            {activeStep === 2 && <TabHostType />}
            {activeStep === 3 && <TabAddress />}
            {activeStep === 4 && <TabCapacity />}
            {activeStep === 5 && <TabDate />}
            {activeStep === 6 && <TabPrice />}
            {activeStep === 7 && <TabImage />}
            {activeStep === 8 && <TabFaclities />}
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
                {tr("Your hosting creation request has been successfully registered")}
              </Text>
              <Text center>
                کمتر از ۴۸ ساعت منتظر بمانید تا میزبانی شما توسط پشتیبانی مفید تریپ ثبت شود و به
                مسافران نمایش داده شود.
              </Text>
              <WhiteSpace />
              <ButtonRow>
                <Button
                  onPress={() => {
                    setIsVisibleFinish(false);
                    routeHandler("/host/management");
                  }}
                  color="secondary"
                  type="outline">
                  {tr("Host Management")}
                </Button>
                <Button
                  onPress={() => {
                    routeHandler("/");
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
