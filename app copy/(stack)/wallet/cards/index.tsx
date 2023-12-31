import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import NoResult from "@organisms/no-result";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { useIsFocused } from "@react-navigation/core";
import { Button, Text, useTheme } from "@rneui/themed";
import { useUserDetailQuery } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";
import BottomButtonLayout from "@components/layout/bottom-button";
import WalletCardDetailBottomSheet from "@modules/wallet/card-detail-bottom-sheet";

const walletCardsScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const isFocused = useIsFocused();

  const { data, loading, refetch } = useUserDetailQuery();

  if (!data || loading) return <LoadingIndicator />;

  if (isFocused) {
    refetch();
  }

  const { walletCards } = data.userDetail.wallet;

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

        {!walletCards.length ? (
          <NoResult />
        ) : (
          walletCards?.map(card => <WalletCardDetailBottomSheet key={card.id} card={card} />)
        )}
      </Container>
    </BottomButtonLayout>
  );
};

export default walletCardsScreen;
