import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { Button, Text } from "@rneui/themed";
import ButtonRow from "@modules/button-rows";
import useTranslation from "@src/hooks/translation";
import DateTab from "@organisms/tour-create/date-tab";
import { useDispatch, useSelector } from "react-redux";
import PriceTab from "@organisms/tour-create/price-tab";
import ImagesTab from "@organisms/tour-create/images-tab";
import OriginTab from "@organisms/tour-create/origin-tab";
import { ImageBackground, StyleSheet } from "react-native";
import DetailsTab from "@organisms/tour-create/details-tab";
import CapacityTab from "@organisms/tour-create/capacity-tab";
import BottomButtonLayout from "@components/layout/bottom-button";
import FacilitiesTab from "@organisms/tour-create/facilities-tab";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import DestinationTab from "@organisms/tour-create/destination-tab";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import { setTourCreateActiveStep } from "@src/slice/tour-create-slice";
import { TourGenderEnum, useMyNgoDetailTourSetQuery, useTourAddMutation } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import TourCreateForm from "@organisms/tour-create";

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

const EditTourScreen = () => {
  const { tr } = useTranslation();
  const { tourId } = useLocalSearchParams();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [submit, { loading: submitLoading }] = useTourAddMutation();

  const { loading, data } = useMyNgoDetailTourSetQuery({
    fetchPolicy: "network-only",
  });

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

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

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

  if (loading && !data) return <LoadingIndicator />;

  const tourDetail = data.NGODetail.tourSet.find(tour => tour.id === tourId);

  const copyOfHostDetail = {
    ...tourDetail,
    facilities: tourDetail.facilities.map(item => item.faName),
    base64Images: tourDetail.avatarS3.map(item => item.small),
    price: tourDetail.packages[0].price,
    discount: tourDetail.packages[0].discount,
    origin: {
      address: tourDetail.origin?.address,
      lat: tourDetail.origin?.lat,
      lng: tourDetail.origin?.lng,
    },
  };

  const initialValues = JSON.parse(
    JSON.stringify(copyOfHostDetail, (key, value) =>
      ["id", "avatarS3", "__typename", "packages", "createdDate", "modifiedDate"].includes(key)
        ? undefined
        : value
    )
  );
  console.log(initialValues, tourDetail);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <BottomButtonLayout
            buttons={[
              <Button
                onPress={activeStep === 8 ? handleSubmit : handleNext}
                disabled={submitLoading || isButtonDisabled}
                loading={submitLoading}>
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
            <TourCreateForm
              activeStep={activeStep}
              isVisibleFinish={isVisibleFinish}
              setIsVisibleFinish={setIsVisibleFinish}
              setIsButtonDisabled={setIsButtonDisabled}
            />
          </BottomButtonLayout>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default EditTourScreen;
