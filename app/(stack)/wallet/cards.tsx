import React from "react";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { Avatar, Text, useTheme } from "@rneui/themed";

const walletCardsScreen = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const { walletCards } = useSelector((state: RootState) => state.userSlice.userDetail.wallet);

  return (
    <Container>
      <WhiteSpace size={24} />

      <Text heading2>{tr("my registered cards")}</Text>
      <WhiteSpace size={6} />
      <Text caption type="grey2">
        {tr("you can manage your bank cards and use them in the withdrawal process.")}
      </Text>

      <WhiteSpace size={24} />

      {walletCards.map(card => (
        <>
          <View key={card.id} style={styles.card}>
            <Avatar rounded size={40} containerStyle={{ backgroundColor: theme.colors.grey1 }} />
            <View style={styles.cardData}>
              <Text>{card.title}</Text>
              <Text>{card.cardPan}</Text>
            </View>
            <Entypo name="chevron-small-left" size={24} color="black" />
          </View>
          <WhiteSpace size={8} />
        </>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  cardData: {
    flex: 1,
  },
});

export default walletCardsScreen;
