import {
  TourTransactionQueryType,
  useTourPurchaseAddMutation,
  useTourTransactionDetailQuery,
} from "@src/gql/generated";
import * as Network from "expo-network";
import { Feather } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import React, { ReactElement, useState } from "react";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import TourTransactionDetail from "@modules/tour/transaction/detail";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import AcceptPayment from "@modules/tour/transaction/buttons/acceptPayment";
import RejectedDetails from "@modules/tour/transaction/buttons/rejectedDetails";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import TourRateBottomSheet from "@modules/rate/tour-rate-bottomSheet";

const TourTransactionDetailScreen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { transactionId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [ratingIsVisible, setRatingIsVisible] = useState<boolean>(false);
  const [isRejectedVisible, setIsRejectedVisible] = useState<boolean>(false);

  const [addPurchase, { loading: purchaseLoading }] = useTourPurchaseAddMutation();

  const { data, loading } = useTourTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  navigation.setOptions({
    title: localizeNumber(data.tourTransactionDetail?.tourPackage?.tour?.title as string),
  });

  const { status, tourPackage, tourGuests } =
    data.tourTransactionDetail as TourTransactionQueryType;

  const handleClose = () => setRatingIsVisible(false);

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          price:
            (tourPackage?.price as number) *
            (1 - (tourPackage?.discount as number) / 100) *
            (tourGuests?.length as number),
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
      ACCEPT: status?.isActive ? (
        <Button onPress={() => setIsVisible(true)}>{tr("pay")}</Button>
      ) : (
        <Button
          icon={
            <Feather name="info" size={16} style={{ marginLeft: 8 }} color={theme.colors.white} />
          }
          onPress={() => setIsRejectedVisible(true)}>
          {tr("reason for rejecting the request")}
        </Button>
      ),
    };
    return lookup[status?.step?.name as string];
  };

  return (
    <BottomButtonLayout buttons={bottomButton() ? [bottomButton()] : []}>
      <TourTransactionDetail
        transactionDetail={data.tourTransactionDetail as TourTransactionQueryType}
      />
      <AcceptPayment
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        purchaseHandler={purchaseHandler}
        purchaseLoading={purchaseLoading}
      />
      <TourRateBottomSheet
        transaction={data.tourTransactionDetail as TourTransactionQueryType}
        isVisible={ratingIsVisible}
        handleClose={handleClose}
      />
      <RejectedDetails
        transaction={data.tourTransactionDetail}
        isVisible={isRejectedVisible}
        setIsVisible={setIsRejectedVisible}
      />
    </BottomButtonLayout>
  );
};

export default TourTransactionDetailScreen;
