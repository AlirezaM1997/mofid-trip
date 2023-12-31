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
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Feather } from "@expo/vector-icons";
import CapacityTab from "@organisms/tour-create/capacity-tab";
import OriginTab from "@organisms/tour-create/origin-tab";
import DestinationTab from "@organisms/tour-create/destination-tab";
import DateTab from "@organisms/tour-create/date-tab";
import PriceTab from "@organisms/tour-create/price-tab";
import ImagesTab from "@organisms/tour-create/images-tab";
import FacilitiesTab from "@organisms/tour-create/facilities-tab";
import { TourGenderEnum, useTourAddMutation } from "@src/gql/generated";
import { Formik } from "formik";
import AccessDenied from "@modules/access-denied";
import { useIsAuthenticated } from "@src/hooks/auth";

const initialValues = {
  title: null,
  description: null,
  capacity: {
    capacityNumber: null,
    gender: TourGenderEnum.Both,
    childAccept: false,
  },
  origin: {
    address: "",
    lat: null,
    lng: null,
  },
  destination: {
    address: "",
    lat: null,
    lng: null,
    province: "",
    city: "",
  },
  startTime: null,
  endTime: null,
  price: null,
  discount: 0,
  base64Images: [],
  facilities: [],
};

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [submit, { loading }] = useTourAddMutation();
  const [isVisibleExit, setIsVisibleExit] = useState(false);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [exitElement, setExitElement] = useState<"HardwareBackButton" | "BackButton">();
  const { activeStep } = useSelector((state: RootState) => state.tourCreateSlice);
  const isAuthenticated = useIsAuthenticated();
  const isNgo = useSelector(
    (state: RootState) => state.authSlice?.loginData?.metadata?.is_ngo || false
  );

  const validationSchema = Yup.object().shape({
    capacity: Yup.object().shape({
      capacityNumber: Yup.number()
        .positive(tr("Capacity is required"))
        .required(tr("Capacity is required")),
      gender: Yup.string(),
      childAccept: Yup.boolean(),
    }),

    startTime: Yup.date().required(tr("Required")),
    endTime: Yup.date().required(tr("Required")),

    destination: Yup.object().shape({
      province: Yup.string().required(tr("Province is required")),
      city: Yup.string().required(tr("City is required")),
      address: Yup.string().required(tr("Address is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    title: Yup.string().required(tr("Title is required")),
    description: Yup.string().nullable(),

    origin: Yup.object().shape({
      address: Yup.string().required(tr("Address is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    price: Yup.number()
      .min(0, tr("Only positive numbers acceptable"))
      .typeError(tr("Only number acceptable"))
      .required(tr("Required")),
    discount: Yup.number()
      .min(0, tr("Only positive numbers acceptable"))
      .max(100, tr("Discount can not be greater than 100"))
      .required(tr("Required")),
  });

  const handleOpen = () => setIsVisibleExit(true);
  const handleClose = () => setIsVisibleExit(false);

  const handleNext = () => dispatch(setTourCreateActiveStep(activeStep + 1));
  const handlePrev = () => dispatch(setTourCreateActiveStep(activeStep - 1));

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
    if (data.tourAdd.status === "OK") {
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
      1: tr("Tour Details"),
      2: tr("Tour Capacity"),
      3: tr("Tour Origin"),
      4: tr("Tour Destination"),
      5: tr("Tour Date"),
      6: tr("Tour Price"),
      7: tr("Tour Images"),
      8: tr("Tour Facilities"),
    }[activeStep];
    navigation.setOptions({
      headerTitle: headerTitle,
    });
  }, [activeStep]);

  if (!isAuthenticated || !isNgo) {
    return <AccessDenied />;
  }

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
          <TourCreateTabs />
          <WhiteSpace />

          <Container>
            {activeStep === 1 && <DetailsTab />}
            {activeStep === 2 && <CapacityTab />}
            {activeStep === 3 && <OriginTab />}
            {activeStep === 4 && <DestinationTab />}
            {activeStep === 5 && <DateTab />}
            {activeStep === 6 && <PriceTab />}
            {activeStep === 7 && <ImagesTab />}
            {activeStep === 8 && <FacilitiesTab />}
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
