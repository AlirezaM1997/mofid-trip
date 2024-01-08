import { StyleSheet, View } from "react-native";
import { BANKES_DATA } from "@src/constant/banks";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar, Text, useTheme } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";

const WithdrawBankCard = ({ card }) => {
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [bankDetail, setBankDetail] = useState({ title: card.title, icon: card.icon });

  useLayoutEffect(() => {
    const matchedCard = BANKES_DATA.find(item => card?.cardPan?.includes(item?.cardPan));

    matchedCard && setBankDetail({ icon: matchedCard?.icon, title: matchedCard?.faName });
  }, []);

  return (
    <View style={styles.card}>
      <Avatar
        rounded
        size={40}
        source={bankDetail?.icon}
        containerStyle={{ backgroundColor: !bankDetail.icon && theme.colors.grey1 }}
      />
      <View style={styles.cardData}>
        <Text>{card.title || bankDetail.title}</Text>
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
