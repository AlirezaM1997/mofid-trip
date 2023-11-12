import {
  TourTransactionQueryType,
  useTourPurchaseAddMutation,
  useTourTransactionEditMutation,
} from "@src/gql/generated";
import React from "react";
import { router } from "expo-router";
import * as Network from "expo-network";
import { useDispatch } from "react-redux";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import TransactionButtons from "@modules/transaction-buttons";
import { setTourTransaction } from "@src/slice/tour-success-transaction";

type PropsType = {
  transaction: TourTransactionQueryType;
};

const ConfirmButton = ({ transaction }: PropsType) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [addPurchase] = useTourPurchaseAddMutation();

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

  return <TransactionButtons transaction={transaction} purchaseHandler={purchaseHandler} />;
};
export default ConfirmButton;
