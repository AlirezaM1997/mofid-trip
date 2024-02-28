import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import TourCreateForm from "@organisms/tour-create";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { TourGenderEnum, useTourAddMutation } from "@src/gql/generated";

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
  const { tr } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [submit, { loading }] = useTourAddMutation();

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
    if (data?.tourAdd?.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

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
                disabled={loading || isButtonDisabled}
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

export default Screen;
