import React from "react";
import { useLocalSearchParams } from "expo-router";
import FailedTransaction from "@organisms/payment/transaction/failed";
import SuccessTransaction from "@organisms/payment/transaction/success";

const PaymentStatus = () => {
  const { status } = useLocalSearchParams();

  return status === "OK" ? <SuccessTransaction /> : <FailedTransaction />;
};

export default PaymentStatus;
