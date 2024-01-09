import React from "react";
import Container from "@atoms/container";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Text } from "@rneui/themed";

const ConfirmWithdrawButtonSheet = ({
  withdrawLoading,
  openConfirmMessage,
  setOpenConfirmMessage,
}) => {
  const { tr } = useTranslation();
  const { handleSubmit } = useFormikContext();

  return (
    <>
      <Button onPress={handleSubmit} loading={withdrawLoading}>
        {tr("withdrawal request")}
      </Button>

      <BottomSheet
        isVisible={openConfirmMessage}
        onBackdropPress={() => setOpenConfirmMessage(false)}>
        <Container>
          <Text center heading2>
            {tr("your request has been registered")}
          </Text>

          <WhiteSpace />

          <Text caption type="grey3">
            {tr(
              "finally, it will be deposited into your selected account within 72 hours. if the deposit is not made, please contact mofidtrip support."
            )}
          </Text>

          <WhiteSpace size={20} />

          <Button onPress={() => setOpenConfirmMessage(false)}>{tr("close")}</Button>
        </Container>
      </BottomSheet>
    </>
  );
};

export default ConfirmWithdrawButtonSheet;
