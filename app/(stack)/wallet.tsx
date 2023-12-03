import React from "react";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Text } from "@rneui/themed";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { WalletTransactionQueryType } from "@src/gql/generated";
import WalletTransactionCard from "@modules/wallet-transaction-card";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const WalletScreen = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { balance, walletTransactions } = useSelector(
    (state: RootState) => state.userSlice.userDetail.wallet
  );

  return (
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
        source={require("@assets/image/wallet.png")}
        resizeMode="cover"
        style={styles.imageBackground}>
        <Text body2 type="white">
          {tr("wallet balance")}
        </Text>
        <Text heading1 type="white">
          {localizeNumber(balance)} {tr("tooman")}
        </Text>
      </ImageBackground>

      <WhiteSpace size={16} />

      <ButtonRow>
        <Button
          size="sm"
          type="outline"
          color="secondary"
          icon={<AntDesign name="arrowup" size={16} color="black" />}>
          {tr("increase")}
        </Button>
        <Button
          size="sm"
          type="outline"
          color="secondary"
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

      <View style={styles.transactionHistory}>
        <Text heading2>{tr("latest transactions")}</Text>
        <Text body2 type="primary">
          {tr("transaction history")}
        </Text>
      </View>

      <WhiteSpace size={6} />
      <Text caption type="grey2">
        {tr("all your recent financial transactions and for you (all transactions are in tomans)")}
      </Text>
      <WhiteSpace size={16} />

      {walletTransactions.map((transaction: WalletTransactionQueryType) => (
        <WalletTransactionCard key={transaction.id} transaction={transaction} />
      ))}

      <WhiteSpace size={24} />
    </Container>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 114,
    padding: 16,
    width: "100%",
    justifyContent: "flex-end",
  },
  transactionHistory: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WalletScreen;
