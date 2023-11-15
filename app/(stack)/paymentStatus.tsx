import React from "react";
import { useLocalSearchParams } from "expo-router";
import FailedPayment from "@organisms/payment/failed";
import SuccessPayment from "@organisms/payment/success";

const PaymentStatus = () => {
  const { status } = useLocalSearchParams();

  return status === "OK" ? <SuccessPayment /> : <FailedPayment />;
};

export default PaymentStatus;
