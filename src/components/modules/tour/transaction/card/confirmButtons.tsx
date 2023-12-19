import React from "react";
import { router } from "expo-router";
import * as Network from "expo-network";
import { useDispatch } from "react-redux";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import TransactionButtons from "@modules/tour/transaction/buttons";
import { TourTransactionQueryType, useTourPurchaseAddMutation } from "@src/gql/generated";
import { totalPrice } from "@src/helper/totalPrice";

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
          price: totalPrice({
            price: transaction.tourPackage.price,
            capacity: transaction.tourguestSet.length,
            endDate: transaction.tourPackage.tour.endTime,
            startDate: transaction.tourPackage.tour.startTime,
          }),
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transaction.id}&type=tour`,
          description: `${tr("buy")} ${transaction?.tourPackage?.tour.title}`,
        },
      },
    });
    router.push(data.tourPurchaseAdd.metadata?.url);
  };

  return <TransactionButtons transaction={transaction} purchaseHandler={purchaseHandler} />;
};
export default ConfirmButton;
