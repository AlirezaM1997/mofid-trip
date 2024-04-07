import React from "react";
import { router } from "expo-router";
import * as Network from "expo-network";
import Toast from "react-native-toast-message";
import { totalPrice } from "@src/helper/total-price";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import TransactionButtons from "@modules/host/transaction/buttons";
import { ProjectTransactionQueryType, useProjectPurchaseAddMutation } from "@src/gql/generated";

type PropsType = {
  transaction: ProjectTransactionQueryType;
};

const ConfirmButton = ({ transaction }: PropsType) => {
  const { tr } = useTranslation();
  const [addPurchase, { loading }] = useProjectPurchaseAddMutation();

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          projectTransactionId: transaction.id,
          price: totalPrice({
            endDate: transaction.dateEnd,
            startDate: transaction.dateStart,
            price: transaction?.project?.price as number,
            discount: transaction.project?.discount as number,
            capacity: transaction.guest?.guestNumber as number,
          }),
          description: `${tr("buy")} ${transaction?.project?.name}`,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transaction.id}&type=host`,
        },
      },
    });

    const error = data?.projectPurchaseAdd?.metadata?.service_error;
    if (error) {
      Toast.show({
        type: "error",
        text1: tr("Error"),
        text2: error,
      });
    } else {
      router.push(data?.projectPurchaseAdd?.metadata?.url);
    }
  };

  return (
    <TransactionButtons
      purchaseLoading={loading}
      transaction={transaction}
      purchaseHandler={purchaseHandler}
    />
  );
};
export default ConfirmButton;
