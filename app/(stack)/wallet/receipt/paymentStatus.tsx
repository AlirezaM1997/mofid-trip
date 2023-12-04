import React from "react";
import { useLocalSearchParams } from "expo-router";
import FailedTransaction from "@organisms/payment/wallet/failed";
import SuccessTransaction from "@organisms/payment/wallet/success";

const PaymentStatus = () => {
  const { status } = useLocalSearchParams();

  return status === "OK" ? <SuccessTransaction /> : <FailedTransaction />;
};

export default PaymentStatus;
