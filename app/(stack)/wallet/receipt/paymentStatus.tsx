import { RootState } from "@src/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import FailedPayment from "@organisms/payment/failed";
import SuccessPayment from "@organisms/payment/success";
import FailedReceiptBottomSheet from "@modules/receipt-bottom-sheet/failed";
import SuccessReceiptBottomSheet from "@modules/receipt-bottom-sheet/success";
import { useWalletTransactionDetailQuery } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";

const PaymentStatus = () => {
  const { status } = useLocalSearchParams();
  const [isSuccessReceiptVisible, setIsSuccessReceiptIsVisible] = useState(false);
  const [isFailedReceiptVisible, setIsFailedReceiptIsVisible] = useState(false);

  const { id } = useSelector((state: RootState) => state.walletTransactionIdSlice);

  const { data, loading } = useWalletTransactionDetailQuery({
    variables: { pk: id as string },
  });

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  return status === "OK" ? (
    <>
      <SuccessReceiptBottomSheet
        isVisible={isSuccessReceiptVisible}
        transaction={data.walletTransactionDetail}
        setIsVisible={setIsSuccessReceiptIsVisible}
      />
      <SuccessPayment handlePress={() => setIsSuccessReceiptIsVisible(true)} />
    </>
  ) : (
    <>
      <FailedReceiptBottomSheet
        isVisible={isFailedReceiptVisible}
        setIsVisible={setIsFailedReceiptIsVisible}
        transaction={data.walletTransactionDetail}
      />
      <FailedPayment handlePress={() => setIsFailedReceiptIsVisible(true)} />
    </>
  );
};

export default PaymentStatus;
