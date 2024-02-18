import {
  RateObjectTypeEnum,
  TourTransactionQueryType,
  useTourPurchaseAddMutation,
  useTourTransactionDetailQuery,
} from "@src/gql/generated";
import { Button } from "@rneui/themed";
import * as Network from "expo-network";
import useTranslation from "@src/hooks/translation";
import { totalPrice } from "@src/helper/totalPrice";
import React, { ReactElement, useState } from "react";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import RatingBottomSheet from "@modules/rating-bottom-sheet";
import BottomButtonLayout from "@components/layout/bottom-button";
import TourTransactionDetail from "@modules/tour/transaction/detail";
import AcceptPayment from "@modules/tour/transaction/buttons/acceptPayment";

const TourTransactionDetailScreen = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const { transactionId } = useLocalSearchParams();
  const [ratingIsVisible, setRatingIsVisible] = useState(false);

  const [addPurchase, { loading: purchaseLoading }] = useTourPurchaseAddMutation();

  const { data, loading } = useTourTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { status, tourPackage, tourGuests } =
    data.tourTransactionDetail as TourTransactionQueryType;

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          price: totalPrice({
            price: tourPackage?.price as number,
            capacity: tourGuests?.length as number,
          }),
          tourTransactionId: transactionId as string,
          description: `${tr("buy")} ${tourPackage?.tour?.title}`,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transactionId}&type=tour`,
        },
      },
    });
    router.push(data?.tourPurchaseAdd?.metadata?.url);
  };

  const bottomButton = () => {
    const lookup: Record<string, ReactElement> = {
      PAYMENT: (
        <Button onPress={() => router.push(`tour/transaction/successReceipt?id=${transactionId}`)}>
          {tr("view invoice")}
        </Button>
      ),
      SUCCESSFUL: (
        <Button onPress={() => setRatingIsVisible(true)}>{tr("rates to the tour")}</Button>
      ),
      ACCEPT: <Button onPress={() => setIsVisible(true)}>{tr("pay")}</Button>,
    };
    return lookup[status?.step?.name as string];
  };

  return (
    <BottomButtonLayout buttons={bottomButton() ? [bottomButton()] : []}>
      <TourTransactionDetail transactionDetail={data.tourTransactionDetail} />
      <AcceptPayment
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        purchaseHandler={purchaseHandler}
        purchaseLoading={purchaseLoading}
      />
      <RatingBottomSheet
        objectType={RateObjectTypeEnum.Project}
        isVisible={ratingIsVisible}
        onBackdropPress={() => setRatingIsVisible(false)}
        value={ratingValue}
        onValueChange={setRatingValue}
        maximumValue={10}
        minimumValue={0}
        step={1}
        allowTouchTrack
      />
    </BottomButtonLayout>
  );
};

export default TourTransactionDetailScreen;
