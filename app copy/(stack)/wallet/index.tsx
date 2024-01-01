import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { Entypo, AntDesign } from "@expo/vector-icons";
import LoadingIndicator from "@modules/Loading-indicator";
import WalletTransactionCard from "@modules/wallet/transaction-card";
import { ImageBackground, Pressable, ScrollView, StyleSheet } from "react-native";
import { WalletTransactionQueryType, useUserDetailQuery } from "@src/gql/generated";
import { useFormatPrice } from "@src/hooks/localization";

const WalletScreen = () => {
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { data, loading } = useUserDetailQuery();

  if (!data || loading) return <LoadingIndicator />;

  const { balance, walletTransactions } = data.userDetail.wallet;

  return (
    <ScrollView>
      <Container>
        <WhiteSpace size={24} />
        <Text heading2>{tr("wallet and recent transactions")}</Text>
        <WhiteSpace />
        <Text caption type="grey2">
          {tr(
            "management and use of inventory increase and withdrawal services, view transaction history"
          )}
        </Text>

        <WhiteSpace size={24} />

        <ImageBackground
          resizeMode="stretch"
          style={styles.imageBackground}
          source={require("@assets/image/wallet.png")}>
          <Text body2 type="white">
            {tr("wallet balance")}
          </Text>
          <Text heading1 type="white">
            {formatPrice(balance)}
          </Text>
        </ImageBackground>

        <WhiteSpace size={16} />

        <ButtonRow>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            onPress={() => router.push("wallet/deposit")}
            icon={<AntDesign name="arrowup" size={16} color="black" />}>
            {tr("increase")}
          </Button>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            onPress={() => router.push("wallet/cards")}
            icon={<Entypo name="credit-card" size={16} color="black" />}>
            {tr("my cards")}
          </Button>
          <Button
            size="sm"
            type="outline"
            color="secondary"
            icon={<AntDesign name="arrowdown" size={16} color="black" />}>
            {tr("withdraw")}
          </Button>
        </ButtonRow>

        <WhiteSpace size={32} />

        <Pressable style={styles.transactionHistory} onPress={() => router.push("/wallet/history")}>
          <Text heading2>{tr("latest transactions")}</Text>
          <Text body2 type="primary">
            {tr("transaction history")}
          </Text>
        </Pressable>

        <WhiteSpace size={6} />
        <Text caption type="grey2">
          {tr(
            "all your recent financial transactions and for you (all transactions are in tomans)"
          )}
        </Text>
        <WhiteSpace size={16} />

        {walletTransactions.slice(0, 3).map((transaction: WalletTransactionQueryType) => (
          <WalletTransactionCard key={transaction.id} transaction={transaction} />
        ))}

        <WhiteSpace size={24} />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 114,
    padding: 16,
    width: "100%",
    // maxWidth: 350,
    justifyContent: "flex-end",
  },
  transactionHistory: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WalletScreen;
