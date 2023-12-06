import React from "react";
import { Button, Text, useTheme } from "@rneui/themed";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import WalletCardDetailBottomSheet from "@modules/wallet/card-detail-bottom-sheet";
import { router } from "expo-router";

const walletCardsScreen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  const { walletCards } = useSelector((state: RootState) => state.userSlice.userDetail.wallet);

  return (
    <BottomButtonLayout
      buttons={[
        <Button
          color="secondary"
          onPress={() => router.push("wallet/cards/add")}
          icon={<AntDesign name="pluscircleo" size={18} color={theme.colors.white} />}>
          {tr("add a new card")}
        </Button>,
      ]}>
      <Container>
        <WhiteSpace size={24} />

        <Text heading2>{tr("my registered cards")}</Text>
        <WhiteSpace size={6} />
        <Text caption type="grey2">
          {tr("you can manage your bank cards and use them in the withdrawal process.")}
        </Text>

        <WhiteSpace size={24} />

        {walletCards.map(card => (
          <WalletCardDetailBottomSheet key={card.id} card={card} />
        ))}
      </Container>
    </BottomButtonLayout>
  );
};

export default walletCardsScreen;
