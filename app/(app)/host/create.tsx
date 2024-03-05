import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import HostCreateForm from "@organisms/host-create";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { ProjectGenderEnum, useProjectAddMutation } from "@src/gql/generated";

const initialValues = {
  name: "",
  dateEnd: null,
  description: "",
  dateStart: null,
  accommodation: {
    lat: null,
    lng: null,
    city: null,
    address: null,
    province: null,
    base64Images: [],
  },
  capacity: {
    childAccept: false,
    capacityNumber: null,
    gender: ProjectGenderEnum.Both,
  },
  price: null,
  discount: 0,
  categories: [],
  facilities: [],
};

const Screen = () => {
  const { tr } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [submit, { loading }] = useProjectAddMutation();

  const validationSchema = Yup.object().shape({
    description: Yup.string().nullable().required(tr("Required")),
    dateEnd: Yup.date().required(tr("Required")),
    dateStart: Yup.date().required(tr("Required")),
    name: Yup.string().required(tr("Title is required")),

    discount: Yup.number().max(100, tr("Discount can not be greater than 100")),
    categories: Yup.array()
      .required("This field is required")
      .min(1, "At least one item is required"),

    price: Yup.number()
      .required(tr("Required"))
      .typeError(tr("Only number acceptable"))
      .min(0, tr("Only positive numbers acceptable")),
    accommodation: Yup.object().shape({
      city: Yup.string().required(tr("City is required")),
      address: Yup.string().required(tr("Address is required")),
      province: Yup.string().required(tr("Province is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    capacity: Yup.object().shape({
      gender: Yup.string(),
      childAccept: Yup.boolean(),
      capacityNumber: Yup.number()
        .positive(tr("Capacity is required"))
        .required(tr("Capacity is required")),
    }),
  });

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

  const handleSubmit = async (values: any) => {
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
    if (data?.projectAdd?.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button
              loading={loading}
              disabled={loading || isButtonDisabled}
              onPress={activeStep === 8 ? handleSubmit : handleNext}>
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
          <HostCreateTabs activeStep={activeStep} />
          <HostCreateForm
            activeStep={activeStep}
            isVisibleFinish={isVisibleFinish}
            setIsVisibleFinish={setIsVisibleFinish}
            setIsButtonDisabled={setIsButtonDisabled}
          />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
