import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import TourCreateForm from "@organisms/tour-create";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { TourAddInputType, TourGenderEnum, useTourAddMutation } from "@src/gql/generated";
import { FilesContext } from "@modules/image-picker/context";

const initialValues: TourAddInputType = {
  title: "",
  description: null,
  capacity: {
    childAccept: false,
    capacityNumber: null,
    gender: TourGenderEnum.Both,
  },
  origin: {
    lat: null,
    lng: null,
    address: "",
  },
  destination: {
    lat: null,
    lng: null,
    city: "",
    address: "",
    province: "",
  },
  discount: 0,
  price: null,
  endTime: "",
  startTime: "",
  facilities: [],
  images: [],
};

const Screen = () => {
  const { tr } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [submit, { loading }] = useTourAddMutation();

  const validationSchema = Yup.object().shape({
    capacity: Yup.object().shape({
      capacityNumber: Yup.number()
        .positive(tr("Capacity is required"))
        .required(tr("Capacity is required")),
      gender: Yup.string(),
      childAccept: Yup.boolean(),
    }),

    endTime: Yup.date().required(tr("Required")),
    startTime: Yup.date().required(tr("Required")),

    destination: Yup.object().shape({
      city: Yup.string().required(tr("City is required")),
      address: Yup.string().required(tr("Address is required")),
      province: Yup.string().required(tr("Province is required")),
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
      .required(tr("Required"))
      .typeError(tr("Only number acceptable"))
      .min(0, tr("Only positive numbers acceptable")),
    discount: Yup.number().max(100, tr("Discount can not be greater than 100")),

    facilities: Yup.array().of(
      Yup.object().shape({
        faName: Yup.string().max(60, "String must be at most 60 characters long"),
        enName: Yup.string().max(60, "String must be at most 60 characters long"),
        arName: Yup.string().max(60, "String must be at most 60 characters long"),
      })
    ),
  });

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

  const handleSubmit = async (values: TourAddInputType) => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          price: +values.price,
          images: selectedFiles,
          discount: +(values.discount as number),
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
          <FilesContext.Provider
            value={{
              selectedFiles: selectedFiles,
              setSelectedFiles: setSelectedFiles,
            }}>
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
                  onPress={handlePrev}
                  disabled={activeStep === 1}>
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
          </FilesContext.Provider>
        )}
      </Formik>
    </>
  );
};

export default Screen;
