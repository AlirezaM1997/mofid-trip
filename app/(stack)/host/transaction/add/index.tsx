import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import Container from "@atoms/container";
import { useEffect, useState } from "react";
import WhiteSpace from "@atoms/white-space";
import { useNavigation } from "expo-router";
import { TourGenderEnum } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostTransactionDateTab from "@organisms/host-transaction/date";
import HostTransactionTab from "@modules/virtual-tabs/host-transaction-tabs";
import HostTransactionCapacityTab from "@organisms/host-transaction/capacity";
import HostTransactionConfirmData from "@organisms/host-transaction/confirm-data";
import HostTransactionExitBottomSheet from "@organisms/host-transaction/exitBottomSheet";
import HostTransactionSubmitBottomSheet from "@organisms/host-transaction/submitBottomSheet";

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
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

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

  const handleNext = () => setActiveStep(activeStep + 1);
  const handlePrev = () => setActiveStep(activeStep - 1);
  const handleSubmit = () => setIsVisibleFinish(true);

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
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <BottomButtonLayout
          buttons={[
            <Button onPress={activeStep === 3 ? handleSubmit : handleNext}>
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
          <HostTransactionTab activeStep={activeStep} />
          <WhiteSpace />

          <Container>
            {activeStep === 1 && <HostTransactionCapacityTab />}
            {activeStep === 2 && <HostTransactionDateTab />}
            {activeStep === 3 && <HostTransactionConfirmData setActiveStep={setActiveStep} />}
          </Container>

          <HostTransactionSubmitBottomSheet
            isVisible={isVisibleFinish}
            setIsVisible={setIsVisibleFinish}
          />
          <HostTransactionExitBottomSheet />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
