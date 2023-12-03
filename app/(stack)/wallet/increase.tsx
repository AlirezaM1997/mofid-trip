import React from "react";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import BottomButtonLayout from "@components/layout/bottom-button";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Increase = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { balance } = useSelector((state: RootState) => state.userSlice.userDetail.wallet);

  return (
    <BottomButtonLayout buttons={[<Button>{tr("increase balance")}</Button>]}>
      <WhiteSpace size={24} />
      <Container>
        <Text heading2>{tr("increase balance")}</Text>
        <WhiteSpace size={4} />
        <Text caption type="grey2">
          {tr("select or enter an amount to increase your wallet balance.")}
        </Text>

        <WhiteSpace size={24} />

        <Text caption center type="grey2">
          {tr("wallet balance")}
        </Text>

        <WhiteSpace />

        <Text center>
          {localizeNumber(balance)} {tr("tooman")}
        </Text>

        <WhiteSpace size={32} />

        <Input value={tr("tooman")} inputStyle={{ borderColor: theme.colors.grey1 }} />
      </Container>
    </BottomButtonLayout>
  );
};

export default Increase;
