import React from "react";
import FailedPayment from "@organisms/payment/failed";
import { router, useLocalSearchParams } from "expo-router";

const FailedTransaction = () => {
  const { id, type } = useLocalSearchParams();

  const handlePress = () =>
    router.push({
      pathname:
        type === "tour" ? `tour/transaction/failedReceipt` : `host/transaction/failedReceipt`,
      params: { id },
    });

  return <FailedPayment handlePress={handlePress} />;
};

export default FailedTransaction;
