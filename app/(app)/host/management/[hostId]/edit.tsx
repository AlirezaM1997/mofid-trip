import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import useTranslation from "@src/hooks/translation";
import HostCreateForm from "@organisms/host-create";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import { FilesContext } from "@modules/image-picker/context";
import { useMyUserDetailProjectSetEditQuery, useProjectEditMutation } from "@src/gql/generated";

const Screen = () => {
  const { tr } = useTranslation();
  const { hostId } = useLocalSearchParams();
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { loading, data } = useMyUserDetailProjectSetEditQuery();

  const [submit, { loading: submitLoading }] = useProjectEditMutation();

  const validationSchema = Yup.object().shape({
    description: Yup.string().nullable(),
    dateEnd: Yup.date().required(tr("Required")),
    dateStart: Yup.date().required(tr("Required")),
    name: Yup.string().required(tr("Title is required")),

    categories: Yup.array()
      .required("This field is required")
      .min(1, "At least one item is required"),

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
      capacityNumber: Yup.number().positive().required(tr("Capacity is required")),
    }),

    price: Yup.number()
      .required(tr("Required"))
      .typeError(tr("Only number acceptable"))
      .min(0, tr("Only positive numbers acceptable")),
    discount: Yup.number().max(100, tr("Discount can not be greater than 100")),
  });

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);

  const handleSubmit = async (values: any) => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          pk: hostId as string,
          price: +values.price,
          discount: +values.discount,
          accommodation: { ...values.accommodation, images: selectedFiles },
          capacity: { ...values.capacity, capacityNumber: +values.capacity.capacityNumber },
        },
      },
    });
    if (data?.projectEdit?.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

  if (!data || loading) return <LoadingIndicator />;

  const hostDetail = data?.userDetail?.projectSet?.find(item => item?.id === hostId);

  const copyOfHostDetail = {
    ...hostDetail,
    categories: hostDetail?.categories?.map(item => item?.id),
    capacity: {
      ...hostDetail?.capacity,
      capacityNumber: hostDetail?.capacity?.guestNumber,
    },
    accommodation: {
      ...hostDetail?.accommodation,
      images: hostDetail?.accommodation?.avatarS3?.map(item => item?.small),
    },
  };

  const initialValues = JSON.parse(
    JSON.stringify(copyOfHostDetail, (key, value) =>
      ["id", "avatarS3", "__typename", "guestNumber"].includes(key) ? undefined : value
    )
  );

  return (
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
            <HostCreateForm
              activeStep={activeStep}
              isVisibleFinish={isVisibleFinish}
              setIsVisibleFinish={setIsVisibleFinish}
              setIsButtonDisabled={setIsButtonDisabled}
            />
          </BottomButtonLayout>
        </FilesContext.Provider>
      )}
    </Formik>
  );
};

export default Screen;
