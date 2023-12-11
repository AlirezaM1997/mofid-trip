import React, { useEffect, useState } from "react";
import WhiteSpace from "@atoms/white-space";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, BottomSheet, Button, Divider, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import ButtonRow from "@modules/button-rows";
import Container from "@atoms/container";
import { BANKES_DATA } from "@src/constant/banks";

const WalletCardDetailBottomSheet = ({ card }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [bankDetail, setBankDetail] = useState({ title: card.title, icon: card.icon });

  useEffect(() => {
    const cardDetail = BANKES_DATA.find(item => card.cardPan.includes(item.cardPan));
    cardDetail && setBankDetail({ icon: cardDetail?.icon, title: cardDetail?.faName });
  }, []);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)} style={styles.card}>
        <Avatar
          rounded
          size={40}
          source={bankDetail?.icon}
          containerStyle={{ backgroundColor: !bankDetail.icon && theme.colors.grey1 }}
        />
        <View style={styles.cardData}>
          <Text>{card.title || bankDetail.title}</Text>
          <Text>{card.cardPan}</Text>
        </View>
        <Entypo name="chevron-small-left" size={24} color="black" />
      </Pressable>
      <WhiteSpace size={8} />

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Container>
          <Avatar
            rounded
            size={40}
            source={bankDetail?.icon}
            containerStyle={styles.avatar(theme)}
          />

          <WhiteSpace size={16} />

          <Text center>{bankDetail.title}</Text>

          <WhiteSpace size={24} />
          <Divider borderStyle="dashed" orientation="vertical" />
          <WhiteSpace size={24} />

          <View style={styles.cardDetail}>
            <Text body2 type="info">
              {card.iban}
            </Text>
            <Text body2 type="grey2">
              {tr("iban")}
            </Text>
          </View>

          <WhiteSpace size={12} />
          <Divider orientation="vertical" />
          <WhiteSpace size={12} />

          <View style={styles.cardDetail}>
            <Text body2 type="info">
              {card.cardPan}
            </Text>
            <Text body2 type="grey2">
              {tr("cardPan")}
            </Text>
          </View>

          <WhiteSpace size={48} />

          <ButtonRow>
            <Button type="outline">{tr("delete")}</Button>
            <Button>{tr("edit card")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
    </>
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
  avatar: theme => ({ margin: "auto" }),
  cardDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default WalletCardDetailBottomSheet;
