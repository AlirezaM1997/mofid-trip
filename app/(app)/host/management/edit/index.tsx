import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import ButtonRow from "@modules/button-rows";
import { BottomSheet } from "@rneui/themed";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { RootState } from "@src/store";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useMyUserDetailProjectSetEditQuery, useProjectEditMutation } from "@src/gql/generated";
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
import TabFaclities from "@organisms/host-create/facilities";
import { useSession } from "@src/context/auth";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import LoadingIndicator from "@modules/Loading-indicator";
import HostCreateForm from "@organisms/host-create";

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { session } = useSession();
  const { hostId } = useLocalSearchParams();
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { activeStep } = useSelector((state: RootState) => state.hostCreateSlice);

  const { loading, data } = useMyUserDetailProjectSetEditQuery();

  const [submit, { loading: submitLoading }] = useProjectEditMutation();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;

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

  const handleNext = () => dispatch(setHostCreateActiveStep(activeStep + 1));
  const handlePrev = () => dispatch(setHostCreateActiveStep(activeStep - 1));

  const handleSubmit = async values => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          pk: hostId,
          price: +values.price,
          discount: +values.discount,
          capacity: { ...values.capacity, capacityNumber: +values.capacity.capacityNumber },
        },
      },
    });
    if (data.projectEdit.status === "OK") {
      setIsVisibleFinish(true);
    }
  };

  if (!data || loading) return <LoadingIndicator />;

  const hostDetail = data.userDetail.projectSet.find(item => item.id === hostId);

  const copyOfHostDetail = {
    ...hostDetail,
    categories: hostDetail.categories.map(item => item.id),
    facilities: hostDetail.facilities.map(item => item.faName),
    accommodation: {
      ...hostDetail.accommodation,
      base64Images: hostDetail.accommodation.avatarS3.map(item => item.small),
    },
  };

  const initialValues = JSON.parse(
    JSON.stringify(copyOfHostDetail, (key, value) =>
      ["id", "avatarS3", "__typename"].includes(key) ? undefined : value
    )
  );

  return (
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

const styles = StyleSheet.create({
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default Screen;
