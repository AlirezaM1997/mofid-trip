import React, { useState } from "react";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import useTranslation from "@src/hooks/translation";
import { Button, Text, BottomSheet } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";

const HostTransactionBottomSheet = ({ children }) => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <BottomButtonLayout
      buttons={[<Button onPress={() => setIsVisible(true)}>{tr("confirm request")}</Button>]}>
      {children}
      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <Container>
          <Text center heading2 bold>
            {tr("are you sure to confirm the request?")}
          </Text>

          <WhiteSpace />

          <Text center>
            {tr(
              "your initial request will be approved or rejected by the tour after it is submitted"
            )}
          </Text>

          <WhiteSpace size={24} />

          <ButtonRow>
            <Button color="secondary" type="outline">
              {tr("cancel and edit")}
            </Button>
            <Button>{tr("submit request")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
    </BottomButtonLayout>
  );
};

export default HostTransactionBottomSheet;
