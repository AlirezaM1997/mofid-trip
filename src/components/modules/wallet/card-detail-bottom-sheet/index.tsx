import React, { useEffect, useState } from "react";
import WhiteSpace from "@atoms/white-space";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Platform, ViewStyle } from "react-native";
import { Avatar, BottomSheet, Button, Divider, Text, useTheme } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import ButtonRow from "@modules/button-rows";
import Container from "@atoms/container";
import { BANKES_DATA } from "@src/constant/banks";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useBankCardDeleteMutation } from "@src/gql/generated";

const WalletCardDetailBottomSheet = ({ card }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [bankDetail, setBankDetail] = useState({ title: card.title, icon: card.icon });
  const { localizeNumber } = useLocalizedNumberFormat();
  const [bankCardDelete, { loading }] = useBankCardDeleteMutation();

  const handlePressCopy = async text => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: "success",
      text1: tr("copied"),
    });
  };

  const handleEdit = () => {
    router.push(`wallet/cards/edit/${card.id}`);
    setIsVisible(false);
  };

  const handleDelete = () => {
    setIsVisibleDelete(true);
  };

  const handleAcceptDelete = async () => {
    const { data } = await bankCardDelete({
      variables: {
        pk: +card.id,
      },
    });
    if (data.bankCardDelete.status === "NO_CONTENT") {
      Toast.show({
        type: "success",
        text1: tr("card deleted successfully"),
      });

      router.push("/wallet/cards");
    }
  };

  useEffect(() => {
    const cardDetail = BANKES_DATA.find(item => card.cardPan.includes(item.cardPan));
    cardDetail && setBankDetail({ icon: cardDetail?.icon, title: cardDetail?.faName });
  }, [card.cardPan]);

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)} style={styles.card(theme)}>
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
        <Entypo name="chevron-small-left" size={24} color="black" />
      </Pressable>
      <WhiteSpace size={8} />

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Container>
          <Avatar rounded size={40} source={bankDetail?.icon} containerStyle={styles.avatar} />

          <WhiteSpace size={16} />

          <Text center>{bankDetail.title}</Text>

          <WhiteSpace size={24} />
          <Divider borderStyle="dashed" orientation="vertical" />
          <WhiteSpace size={24} />

          <View style={styles.cardDetail}>
            <Pressable onPress={() => handlePressCopy(card.iban)}>
              <Text body2 type="info">
                {localizeNumber(card.iban)}
              </Text>
            </Pressable>
            <Text body2 type="grey2">
              {tr("iban")}
            </Text>
          </View>

          <WhiteSpace size={12} />
          <Divider orientation="vertical" />
          <WhiteSpace size={12} />

          <View style={styles.cardDetail}>
            <Pressable onPress={() => handlePressCopy(card.cardPan)}>
              <Text body2 type="info">
                {localizeNumber(card.cardPan)}
              </Text>
            </Pressable>
            <Text body2 type="grey2">
              {tr("cardPan")}
            </Text>
          </View>

          <WhiteSpace size={48} />

          <ButtonRow>
            <Button type="outline" onPress={handleDelete}>
              {tr("delete")}
            </Button>
            <Button onPress={handleEdit}>{tr("edit card")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>

      <BottomSheet isVisible={isVisibleDelete} onBackdropPress={() => setIsVisibleDelete(false)}>
        <Container>
          <Text heading2 bold center>
            {tr("are you sure to delete your bank card?")}
          </Text>
          <WhiteSpace size={8} />
          <Text body2 center type="grey3">
            {tr(
              "if you confirm and click on the yes option, your bank card will be removed from mofidtrip."
            )}
          </Text>
          <WhiteSpace size={24} />
          <ButtonRow>
            <Button type="outline" onPress={() => setIsVisibleDelete(false)}>
              {tr("no")}
            </Button>
            <Button onPress={handleAcceptDelete}>{tr("yes")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  card: theme => ({
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  }),
  cardData: {
    flex: 1,
    gap: 4,
  },
  avatar: { margin: "auto" },
  cardDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default WalletCardDetailBottomSheet;
