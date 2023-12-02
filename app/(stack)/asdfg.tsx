import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import useTranslation from "@src/hooks/translation";
import { Avatar, BottomSheet, Button, Divider, Text, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const RequestToMyHostsScreen = () => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  return (
    <>
      <View style={style.container}>
        <View>
          <Text heading2>{tr("requests and passengers")}</Text>
          <Text caption type="grey2">
            {tr(
              "passengers who plan to travel with this tour. please check the submitted requests."
            )}
          </Text>
        </View>
        <View style={style.cardList}>
          <View style={style.card}>
            <View style={style.avatarNameBox}>
              <Avatar rounded size={48} source={require("@assets/image/Dambiz.jpg")} />
              <View style={style.nameBox}>
                <Text subtitle2>سید محمدحسین میرشفیعی</Text>
                <Text caption type="grey3">
                  در انتظار بررسی
                </Text>
              </View>
            </View>
            <Text caption style={style.moreDetail} onPress={() => setIsVisible(true)}>
              {tr("more details")}
            </Text>
          </View>
          <Divider />
        </View>
      </View>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <View style={{ alignItems: "center", gap: 16, paddingVertical: 20 }}>
          <Avatar rounded size={48} source={require("@assets/image/Dambiz.jpg")} />
          <View style={{ gap: 4, alignItems: "center" }}>
            <Text subtitle2>سید رضا تهامی / {tr("team leader")}</Text>
            <Text caption type="grey2">
              +98 912 111 1111
            </Text>
            <Text caption type="grey2">
              درخواست در انتظار بررسی می باشد
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Button color={theme.theme.colors.grey0}>
              <MaterialIcons name="phone-in-talk" size={24} color="black" />
              <Text caption>{tr("contact")}</Text>
            </Button>
            <Button color={theme.theme.colors.grey0}>
              <Ionicons name="chatbubble-ellipses" size={24} color="black" />
              <Text caption>{tr("message")}</Text>
            </Button>
          </View>
        </View>
        <Divider thickness={8} />
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 24,
    gap: 30,
  },
  cardList: {
    gap: 24,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarNameBox: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  nameBox: {
    gap: 4,
    marginVertical: "auto",
  },
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
});

export default RequestToMyHostsScreen;
