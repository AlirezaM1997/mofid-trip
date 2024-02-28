import { RootState } from "@src/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import FailedPayment from "@organisms/payment/failed";
import SuccessPayment from "@organisms/payment/success";
import LoadingIndicator from "@modules/Loading-indicator";
import { WalletTransactionQueryType, useWalletTransactionDetailQuery } from "@src/gql/generated";
import FailedReceiptBottomSheet from "@modules/receipt-bottom-sheet/failed";
import SuccessReceiptBottomSheet from "@modules/receipt-bottom-sheet/success";

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
        isVisible={isSuccessReceiptVisible as boolean}
        transaction={data.walletTransactionDetail as WalletTransactionQueryType}
        setIsVisible={setIsSuccessReceiptIsVisible as React.Dispatch<React.SetStateAction<boolean>>}
      />
      <SuccessPayment handlePress={() => setIsSuccessReceiptIsVisible(true)} />
    </>
  ) : (
    <>
      <FailedReceiptBottomSheet
        isVisible={isFailedReceiptVisible as boolean}
        setIsVisible={setIsFailedReceiptIsVisible as React.Dispatch<React.SetStateAction<boolean>>}
        transaction={data.walletTransactionDetail as WalletTransactionQueryType}
      />
      <FailedPayment handlePress={() => setIsFailedReceiptIsVisible(true)} />
    </>
  );
};

export default PaymentStatus;
