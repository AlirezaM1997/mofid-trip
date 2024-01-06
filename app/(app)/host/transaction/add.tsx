import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { TourGenderEnum } from "@src/gql/generated";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostTransactionTab from "@modules/virtual-tabs/host-transaction-tabs";
import HostTransactionDateTab from "@organisms/host-transaction/date";
import HostTransactionCapacityTab from "@organisms/host-transaction/capacity";
import HostTransactionConfirmData from "@organisms/host-transaction/confirm-data";
import HostTransactionSubmitBottomSheet from "@organisms/host-transaction/submitBottomSheet";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";

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
          <CloseFormBottomSheet />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
