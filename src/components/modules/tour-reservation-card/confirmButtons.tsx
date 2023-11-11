import {
  StatusInputType,
  TourTransactionQueryType,
  TransactionStatusEnum,
  useTourPurchaseAddMutation,
  useTourTransactionEditMutation,
} from "@src/gql/generated";
import React from "react";
import * as Network from "expo-network";
import Toast from "react-native-toast-message";
import TransactionButtons from "@modules/transaction-buttons";
import useTranslation from "@src/hooks/translation";
import { Linking } from "react-native";
import { router } from "expo-router";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import { useDispatch } from "react-redux";
import { setTourTransaction } from "@src/slice/tour-success-transaction";

type PropsType = {
  apiTransactionStep: string;
  transaction: TourTransactionQueryType;
  status: { step: string | number; isActive: boolean };
  setStatus: (status: { step: string | number; isActive: boolean }) => void;
};

const ConfirmButton = ({ apiTransactionStep, status, setStatus, transaction }: PropsType) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
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
          transactionId: transaction.id,
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

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();

    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          appLink: ZARINPAL_CALLBACK_URL,
          tourTransactionId: transaction.id,
          price: transaction.tourPackage.price.toString(),
          description: `${tr("buy")} ${transaction?.tourPackage?.tour.title}`,
        },
      },
    });
    dispatch(setTourTransaction(transaction));
    router.push(data.tourPurchaseAdd.metadata?.url);
  };

  return (
    <TransactionButtons
      status={status}
      cancelHandler={cancelHandler}
      setStatus={setStatus}
      transactionId={transaction.id}
      apiTransactionStep={apiTransactionStep}
      purchaseHandler={purchaseHandler}
    />
  );
};
export default ConfirmButton;
