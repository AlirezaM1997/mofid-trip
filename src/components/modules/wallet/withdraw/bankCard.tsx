import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { BANKES_DATA } from "@src/constant/banks";
import { useLocalizedNumberFormat } from "@src/hooks/translation";

const WithdrawBankCard = ({ card }) => {
  const { localizeNumber } = useLocalizedNumberFormat();

  const matchedCard = BANKES_DATA.find(item => card?.cardPan?.includes(item?.cardPan));

  return (
    <View style={styles.card}>
      <Avatar rounded size={40} source={matchedCard?.icon} />
      <View style={styles.cardData}>
        <Text>{card.title || matchedCard?.faName}</Text>
        <Text caption type="grey3">
          {localizeNumber(card.cardPan)}
        </Text>
      </View>
    </View>
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
    gap: 4,
  },
});

export default WithdrawBankCard;
