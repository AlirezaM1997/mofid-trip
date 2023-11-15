import React from "react";
import { router } from "expo-router";
import * as Network from "expo-network";
import { useDispatch } from "react-redux";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import TransactionButtons from "@modules/transaction-buttons";
import { setTourTransaction } from "@src/slice/tour-success-transaction";
import { TourTransactionQueryType, useTourPurchaseAddMutation } from "@src/gql/generated";

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
          tourTransactionId: transaction.id,
          price: transaction.tourPackage.price.toString(),
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transaction.id}`,
          description: `${tr("buy")} ${transaction?.tourPackage?.tour.title}`,
        },
      },
    });
    dispatch(setTourTransaction(transaction));
    router.push(data.tourPurchaseAdd.metadata?.url);
  };
  
  console.log('888', ZARINPAL_CALLBACK_URL)
  return <TransactionButtons transaction={transaction} purchaseHandler={purchaseHandler} />;
};
export default ConfirmButton;
