import {
  ProjectTransactionQueryType,
  useProjectPurchaseAddMutation,
  useProjectTransactionDetailQuery,
} from "@src/gql/generated";
import * as Network from "expo-network";
import { Feather } from "@expo/vector-icons";
import { Button, useTheme } from "@rneui/themed";
import { totalPrice } from "@src/helper/totalPrice";
import useTranslation from "@src/hooks/translation";
import { ZARINPAL_CALLBACK_URL } from "@src/settings";
import React, { ReactElement, useState } from "react";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import HostTransactionDetail from "@modules/host/transaction/detail";
import HostRateBottomSheet from "@modules/rate/host-rate-bottomSheet";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import AcceptPayment from "@modules/host/transaction/buttons/acceptPayment";
import RejectedDetails from "@modules/host/transaction/buttons/rejectedDetails";

const TransactionDetailsScreen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { transactionId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [isRejectedVisible, setIsRejectedVisible] = useState<boolean>(false);

  const handleClose = () => setIsBottomSheetVisible(false);

  const [addPurchase, { loading: purchaseLoading }] = useProjectPurchaseAddMutation();

  const { data, loading } = useProjectTransactionDetailQuery({
    variables: { pk: transactionId as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { status, project, dateEnd, dateStart, guest } =
    data.projectTransactionDetail as ProjectTransactionQueryType;

  navigation.setOptions({ title: project?.name });

  const purchaseHandler = async () => {
    const ip = await Network.getIpAddressAsync();
    const { data } = await addPurchase({
      variables: {
        data: {
          ip,
          price: totalPrice({
            endDate: dateEnd,
            startDate: dateStart,
            price: project?.price as number,
            capacity: guest?.guestNumber as number,
          }),
          description: `${tr("buy")} ${project?.name}`,
          projectTransactionId: transactionId as string,
          appLink: `${ZARINPAL_CALLBACK_URL}?id=${transactionId}&type=host`,
        },
      },
    });

    if (data?.projectPurchaseAdd?.status === "OK") {
      router.push(data.projectPurchaseAdd.metadata?.url);
    }
  };

  const bottomButton = () => {
    const lookup: Record<string, ReactElement> = {
      PAYMENT: (
        <Button onPress={() => router.push(`host/transaction/successReceipt?id=${transactionId}`)}>
          {tr("view invoice")}
        </Button>
      ),
      SUCCESSFUL: (
        <Button onPress={() => setIsBottomSheetVisible(true)}>{tr("rates to the host")}</Button>
      ),
      ACCEPT: data.projectTransactionDetail?.status?.isActive ? (
        data?.projectTransactionDetail?.project?.price ? (
          <Button loading={purchaseLoading} onPress={() => setIsVisible(true)}>
            {tr("pay")}
          </Button>
        ) : (
          <Button loading={purchaseLoading} onPress={purchaseHandler}>
            {tr("reserve")}
          </Button>
        )
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
      <HostTransactionDetail
        transactionDetail={data.projectTransactionDetail as ProjectTransactionQueryType}
      />
      <AcceptPayment
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        purchaseLoading={purchaseLoading}
        purchaseHandler={purchaseHandler}
      />
      <HostRateBottomSheet
        handleClose={handleClose}
        isVisible={isBottomSheetVisible}
        transaction={data?.projectTransactionDetail as ProjectTransactionQueryType}
      />
      <RejectedDetails
        transaction={data.projectTransactionDetail}
        isVisible={isRejectedVisible}
        setIsVisible={setIsRejectedVisible}
      />
    </BottomButtonLayout>
  );
};

export default TransactionDetailsScreen;
