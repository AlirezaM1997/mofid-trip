import { useEffect } from "react";
import Container from "@atoms/container";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import { ProjectTransactionAddInputType } from "@src/gql/generated";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import HostTransactionDateTab from "@organisms/host-transaction/date";
import HostTransactionTab from "@modules/virtual-tabs/host-transaction-tabs";
import HostTransactionCapacityTab from "@organisms/host-transaction/capacity";
import HostTransactionConfirmData from "@organisms/host-transaction/confirm-data";

const HostTransactionForm = ({
  activeStep,
  setActiveStep,
  setIsButtonDisabled,
}: {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { values } = useFormikContext<ProjectTransactionAddInputType>();

  useEffect(() => {
    if (activeStep === 1 && (!values.dateStart || !values.dateEnd))
      return setIsButtonDisabled(true);
    if (activeStep === 2 && !values.guests.guestNumber) return setIsButtonDisabled(true);
    setIsButtonDisabled(false);
  }, [values, activeStep]);

  return (
    <>
      <HostTransactionTab activeStep={activeStep} />
      <WhiteSpace />

      <Container>
        {activeStep === 1 && <HostTransactionDateTab />}
        {activeStep === 2 && <HostTransactionCapacityTab />}
        {activeStep === 3 && (
          <HostTransactionConfirmData
            setActiveStep={setActiveStep as React.Dispatch<React.SetStateAction<number>>}
          />
        )}
      </Container>

      <CloseFormBottomSheet />
    </>
  );
};

export default HostTransactionForm;
