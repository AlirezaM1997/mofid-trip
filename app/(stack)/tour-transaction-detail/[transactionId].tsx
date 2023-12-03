import { Button } from "@rneui/themed";
import * as Network from "expo-network";
import React, { ReactElement, useState } from "react";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import TourTransactionDetail from "@modules/transaction-detail";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useTourPurchaseAddMutation, useTourTransactionDetailQuery } from "@src/gql/generated";
import AcceptPayment from "@modules/transaction-buttons/acceptPayment";

const TourTransactionDetailScreen = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { transactionId } = useLocalSearchParams();

  const [addPurchase] = useTourPurchaseAddMutation();

  const { data, loading } = useTourTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { status, tourPackage } = data.tourTransactionDetail;

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          tourTransactionId: transactionId as string,
          price: tourPackage.price.toString(),
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transactionId}`,
          description: `${tr("buy")} ${tourPackage?.tour.title}`,
        },
      },
    });
    router.push(data.tourPurchaseAdd.metadata?.url);
  };

  const bottomButton = () => {
    const lookup: Record<string, ReactElement> = {
      PAYMENT: (
        <Button onPress={() => router.push(`/successReceipt?id=${transactionId}`)}>
          {tr("view invoice")}
        </Button>
      ),
      SUCCESSFUL: <Button>{tr("rates to the tour")}</Button>,
      ACCEPT: <Button onPress={() => setIsVisible(true)}>{tr("pay")}</Button>,
    };
    return lookup[status.step || null];
  };

  return (
    <BottomButtonLayout buttons={bottomButton() ? [bottomButton()] : []}>
      <TourTransactionDetail transactionDetail={data.tourTransactionDetail} />
      <AcceptPayment
        purchaseHandler={purchaseHandler}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </BottomButtonLayout>
  );
};

export default TourTransactionDetailScreen;
