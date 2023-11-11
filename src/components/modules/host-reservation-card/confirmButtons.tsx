import {
  StatusInputType,
  TransactionStatusEnum,
  useProjectTransactionEditMutation,
} from "@src/gql/generated";
import React from "react";
import Toast from "react-native-toast-message";
import TransactionButtons from "@modules/transaction-buttons";

type PropsType = {
  transactionId: string;
  apiTransactionStep: string;
  status: { step: string | number; isActive: boolean };
  setStatus: (status: { step: string | number; isActive: boolean }) => void;
};

const ConfirmButton = ({ apiTransactionStep, status, setStatus, transactionId }: PropsType) => {
  const [cancel] = useProjectTransactionEditMutation();
  const purchaseHandler = () => {
    console.log(0);
  };

  const cancelHandler = async () => {
    const newStatus = {
      step:
        apiTransactionStep === TransactionStatusEnum.Accept
          ? TransactionStatusEnum.Payment
          : apiTransactionStep,
      isActive: false,
    };
    setStatus(newStatus);
    const { data } = await cancel({
      variables: {
        data: {
          transactionId: transactionId,
          status: newStatus as StatusInputType,
        },
      },
    });

    if (data?.projectTransactionEdit?.statusCode === 200) {
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: data.projectTransactionEdit.message,
      });
    }
  };

  return (
    <TransactionButtons
      status={status}
      setStatus={setStatus}
      cancelHandler={cancelHandler}
      transactionId={transactionId}
      purchaseHandler={purchaseHandler}
      apiTransactionStep={apiTransactionStep}
    />
  );
};
export default ConfirmButton;
