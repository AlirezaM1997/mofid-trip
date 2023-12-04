import React from "react";
import SuccessPayment from "@organisms/payment/success";
import { router, useLocalSearchParams } from "expo-router";

const SuccessWalletPayment = () => {
  const { id } = useLocalSearchParams();

  const handlePress = () => {
    router.push({
      pathname: `wallet/receipt/successReceipt`,
      params: { id },
    });
  };

  return <SuccessPayment handlePress={handlePress} />;
};

export default SuccessWalletPayment;
