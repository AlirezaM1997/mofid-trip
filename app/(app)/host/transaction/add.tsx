import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourGenderEnum } from "@src/gql/generated";
import HostTransactionForm from "@organisms/host-transaction";
import BottomButtonLayout from "@components/layout/bottom-button";
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
  const [activeStep, setActiveStep] = useState(1);
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
            <Button
              disabled={isButtonDisabled}
              onPress={activeStep === 3 ? handleSubmit : handleNext}>
              {activeStep === 3 ? tr("Submit") : tr("Next")}
            </Button>,
            <Button
              type="outline"
              color="secondary"
              onPress={handlePrev}
              disabled={activeStep === 1}>
              {tr("Previous")}
            </Button>,
          ]}>
          <HostTransactionForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setIsButtonDisabled={setIsButtonDisabled}
          />
          <HostTransactionSubmitBottomSheet
            isVisible={isVisibleFinish}
            setIsVisible={setIsVisibleFinish}
          />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default Screen;
