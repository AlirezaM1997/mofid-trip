import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import HostTransactionForm from "@organisms/host-transaction";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import { useProjectTransactionDetailQuery } from "@src/gql/generated";
import HostTransactionEditSubmitBottomSheet from "@organisms/host-transaction/editSubmitBottomSheet";

const HostTransactionEditScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const [activeStep, setActiveStep] = useState(3);
  const { transactionId, name } = useLocalSearchParams();
  const [isVisibleFinish, setIsVisibleFinish] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { data, loading } = useProjectTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) return <LoadingIndicator />;

  const { id, status, guest, dateEnd, dateStart } = data.projectTransactionDetail;

  const initialValues = {
    guests: {
      gender: guest.gender,
      guestNumber: guest.guestNumber,
      childAccept: guest.childAccept,
    },
    dateStart,
    dateEnd,
  };

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
    navigation.setOptions({
      headerTitle: name,
    });
  }, []);

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
              disabled={activeStep === 1}
              onPress={handlePrev}>
              {tr("Previous")}
            </Button>,
          ]}>
          <HostTransactionForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setIsButtonDisabled={setIsButtonDisabled}
          />
          <HostTransactionEditSubmitBottomSheet
            status={status}
            transactionId={id}
            isVisible={isVisibleFinish}
            setIsVisible={setIsVisibleFinish}
          />
          <CloseFormBottomSheet />
        </BottomButtonLayout>
      )}
    </Formik>
  );
};

export default HostTransactionEditScreen;
