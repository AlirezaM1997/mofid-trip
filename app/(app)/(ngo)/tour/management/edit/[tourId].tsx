import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import useTranslation from "@src/hooks/translation";
import TourCreateForm from "@organisms/tour-create";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useMyNgoDetailTourSetEditQuery, useTourEditMutation } from "@src/gql/generated";

const EditTourScreen = () => {
  const { tr } = useTranslation();
  const { tourId } = useLocalSearchParams();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [submit, { loading: submitLoading }] = useTourEditMutation();

  const { loading, data } = useMyNgoDetailTourSetEditQuery({
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

    endTime: Yup.date().required(tr("Required")),
    startTime: Yup.date().required(tr("Required")),

    destination: Yup.object().shape({
      province: Yup.string().required(tr("Province is required")),
      city: Yup.string().required(tr("City is required")),
      address: Yup.string().required(tr("Address is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    description: Yup.string().nullable(),
    title: Yup.string().required(tr("Title is required")),

    origin: Yup.object().shape({
      address: Yup.string().required(tr("Address is required")),
      lat: Yup.string().required(tr("Select location on the map")),
      lng: Yup.string().required(tr("Select location on the map")),
    }),

    price: Yup.number().typeError(tr("Only number acceptable")),
    discount: Yup.number().max(100, tr("Discount can not be greater than 100")),
  });

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

  const handleSubmit = async values => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          pk: tourId,
          price: +values.price,
          discount: +values.discount,
          capacity: { ...values.capacity, capacityNumber: +values.capacity.capacityNumber },
        },
      },
    });
    if (data?.tourEdit?.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

  if (loading && !data) return <LoadingIndicator />;

  const tourDetail = data?.NGODetail?.tourSet?.find(tour => tour?.id === tourId);

  const copyOfHostDetail = {
    ...tourDetail,
    base64Images: tourDetail?.avatarS3?.map(item => item?.large),
    price: tourDetail?.packages[0].price,
    discount: tourDetail?.packages[0].discount,
    capacity: {
      ...tourDetail?.capacity,
      capacityNumber: tourDetail?.capacity?.guestNumber,
    },
  };

  const initialValues = JSON.parse(
    JSON.stringify(copyOfHostDetail, (key, value) =>
      ["id", "avatarS3", "packages", "__typename", "guestNumber"].includes(key) ? undefined : value
    )
  );

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

export default EditTourScreen;
