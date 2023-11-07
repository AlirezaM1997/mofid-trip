import React from "react";
import TransactionButtons from "@modules/transaction-buttons";
import {
  StatusInputType,
  TransactionStatusEnum,
  useTourPurchaseAddMutation,
  useTourTransactionEditMutation,
} from "@src/gql/generated";
import Toast from "react-native-toast-message";

type PropsType = {
  transactionId: string;
  apiTransactionStep: string;
  status: { step: string | number; isActive: boolean };
  setStatus: (status: { step: string | number; isActive: boolean }) => void;
};

const ConfirmButton = ({ apiTransactionStep, status, setStatus, transactionId }: PropsType) => {
  const [cancel] = useTourTransactionEditMutation();
  const [addPurchase] = useTourPurchaseAddMutation();

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

    if (data?.tourTransactionEdit?.statusCode === 200) {
      Toast.show({
        type: "success",
        text1: "Successful",
        text2: data.tourTransactionEdit.message,
      });
    }
  };

  const purchaseHandler = () => {
    addPurchase({
      variables: {
        data: {
          ip: "",
          price: "",
          appLink: "",
          description: "",
          tourTransactionId: "",
        },
      },
    });
  };

  return (
    <TransactionButtons
      status={status}
      cancelHandler={cancelHandler}
      setStatus={setStatus}
      transactionId={transactionId}
      apiTransactionStep={apiTransactionStep}
      purchaseHandler={purchaseHandler}
    />
  );
};
export default ConfirmButton;
