import { Button } from "@rneui/themed";
import * as Network from "expo-network";
import useTranslation from "@src/hooks/translation";
import React, { ReactElement, useState } from "react";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import TourTransactionDetail from "@modules/tour/transaction/detail";
import AcceptPayment from "@modules/tour/transaction/buttons/acceptPayment";
import { useTourPurchaseAddMutation, useTourTransactionDetailQuery } from "@src/gql/generated";

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
          price: tourPackage.price.toString(),
          tourTransactionId: transactionId as string,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transactionId}&type=tour`,
          description: `${tr("buy")} ${tourPackage?.tour.title}`,
        },
      },
    });
    router.push(data.tourPurchaseAdd.metadata?.url);
  };

  const bottomButton = () => {
    const lookup: Record<string, ReactElement> = {
      PAYMENT: (
        <Button onPress={() => router.push(`tour/transaction/successReceipt?id=${transactionId}`)}>
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
