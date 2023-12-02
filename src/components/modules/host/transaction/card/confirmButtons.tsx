import React from "react";
import { router } from "expo-router";
import * as Network from "expo-network";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import TransactionButtons from "@modules/host/transaction/buttons";
import { ProjectTransactionQueryType, useProjectPurchaseAddMutation } from "@src/gql/generated";

type PropsType = {
  transaction: ProjectTransactionQueryType;
};

const ConfirmButton = ({ transaction }: PropsType) => {
  const { tr } = useTranslation();
  const [addPurchase] = useProjectPurchaseAddMutation();

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          projectTransactionId: transaction.id,
          price: transaction.project.price.toString(),
          description: `${tr("buy")} ${transaction?.project.name}`,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transaction.id}&type=host`,
        },
      },
    });

    router.push(data.projectPurchaseAdd.metadata?.url);
  };

  return <TransactionButtons transaction={transaction} purchaseHandler={purchaseHandler} />;
};
export default ConfirmButton;
