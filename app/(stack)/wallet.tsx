import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Image, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import React from "react";
import { ImageBackground, View } from "react-native";

const WalletScreen = () => {
  const { tr } = useTranslation();

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
        style={{ width: "100%", height: 114, justifyContent: "flex-end", padding: 16 }}>
        <Text body2 type="white">
          {tr("wallet balance")}
        </Text>
        <Text heading1 type="white">
          ۱,۵۰۰,۰۰۰ تومان
        </Text>
      </ImageBackground>

      <WhiteSpace size={16} />

      <ButtonRow>
        <Button type="outline" color="secondary">
          {tr("increase")}
        </Button>
        <Button type="outline" color="secondary">
          {tr("my cards")}
        </Button>
        <Button type="outline" color="secondary">
          {tr("withdraw")}
        </Button>
      </ButtonRow>

      <WhiteSpace size={32} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text heading2>{tr("latest transactions")}</Text>
        <Text body2 type="primary">
          {tr("transaction history")}
        </Text>
      </View>
      <WhiteSpace size={6}/>
      <Text caption type="grey2">
        {tr("all your recent financial transactions and for you (all transactions are in tomans)")}
      </Text>
    </Container>
  );
};

export default WalletScreen;
