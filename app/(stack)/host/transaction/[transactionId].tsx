import {
  ProjectTransactionQueryType,
  useProjectPurchaseAddMutation,
  useProjectTransactionDetailQuery,
} from "@src/gql/generated";
import { Button } from "@rneui/themed";
import * as Network from "expo-network";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import React, { ReactElement, useState } from "react";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostTransactionDetail from "@modules/host/transaction/detail ";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import AcceptPayment from "@modules/host/transaction/buttons/acceptPayment";

const TransactionDetailsScreen = () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { transactionId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  const [addPurchase] = useProjectPurchaseAddMutation();

  const { data, loading } = useProjectTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { status, project } = data.projectTransactionDetail;

  navigation.setOptions({ title: project.name });

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          price: project.price.toString(),
          description: `${tr("buy")} ${project?.name}`,
          projectTransactionId: transactionId as string,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transactionId}`,
        },
      },
    });
    router.push(data.projectPurchaseAdd.metadata?.url);
  };

  const bottomButton = () => {
    const lookup: Record<string, ReactElement> = {
      PAYMENT: (
        <Button onPress={() => router.push(`/successReceipt?id=${transactionId}`)}>
          {tr("view invoice")}
        </Button>
      ),
      SUCCESSFUL: <Button>{tr("rates to the host")}</Button>,
      ACCEPT: <Button onPress={() => setIsVisible(true)}>{tr("pay")}</Button>,
    };
    return lookup[status.step || null];
  };

  return (
    <BottomButtonLayout buttons={bottomButton() ? [bottomButton()] : []}>
      <HostTransactionDetail
        transactionDetail={data.projectTransactionDetail as ProjectTransactionQueryType}
      />
      <AcceptPayment
        purchaseHandler={purchaseHandler}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BottomButtonLayout>
  );
};

export default TransactionDetailsScreen;
