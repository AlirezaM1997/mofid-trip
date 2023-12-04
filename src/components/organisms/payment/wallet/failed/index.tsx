import React from "react";
import FailedPayment from "@organisms/payment/failed";
import { router, useLocalSearchParams } from "expo-router";

const FailedTransaction = () => {
  const { id } = useLocalSearchParams();

  const handlePress = () =>
    router.push({
      pathname: `wallet/receipt/failedReceipt`,
      params: { id },
    });

  return <FailedPayment handlePress={handlePress} />;
};

export default FailedTransaction;
