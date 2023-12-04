import React from "react";
import SuccessPayment from "@organisms/payment/success";
import { router, useLocalSearchParams } from "expo-router";

const SuccessTransaction = () => {
  const { id, type } = useLocalSearchParams();

  const handlePress = () => {
    router.push({
      pathname:
        type === "tour" ? `tour/transaction/successReceipt` : `host/transaction/successReceipt`,
      params: { id },
    });
  };

  return <SuccessPayment handlePress={handlePress} />;
};

export default SuccessTransaction;
