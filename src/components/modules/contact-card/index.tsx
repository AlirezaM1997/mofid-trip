import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, BottomSheet, Text, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Linking } from "react-native";
import { SECONDARY_COLOR } from "@src/theme";
import WhiteSpace from "@atoms/white-space";
import { router } from "expo-router";

const ContactCard = ({ user }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { localizeNumber } = useLocalizedNumberFormat();

  return (
    <>
      <View style={style.container}>
        <Pressable
          onPress={() =>
            user?.ngo?.id
              ? router.push({ pathname: "/host-owner", params: { ngoId: user?.ngo?.id } })
              : null
          }>
          <View style={style.avatarNameBox}>
            {user?.avatarS3?.small ? (
              <Avatar rounded size={48} source={{ uri: user.avatarS3.small }} />
            ) : (
              <Avatar
                rounded
                size={48}
                icon={{
                  name: "user",
                  type: "feather",
                  size: 26,
                }}
                containerStyle={{ backgroundColor: theme.colors.grey2 }}
              />
            )}
            <View style={style.nameBox}>
              <Text caption type="grey3">
                {tr("ngo details")}
              </Text>
              <Text subtitle2>{localizeNumber(user.title)}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => setIsVisible(true)}>
          <View style={style.iconBox(theme)}>
            <Ionicons name="chatbubble-ellipses" size={14.4} color={theme.colors.info} />
          </View>
        </Pressable>
      </View>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Pressable style={style.closer} onPress={() => setIsVisible(false)}>
          <Feather name="x-circle" size={24} color="transparent" />
          <Text heading1>{tr("Contact the place")}</Text>
          <Feather name="x-circle" size={24} color={theme.colors.black} />
        </Pressable>
        <View style={style.socialContainer}>
          <Text body2 color="grey3" style={style.contactText}>
            {tr(
              "You can contact the owner of the place through the following social networks or directly"
            )}
          </Text>
          <View style={style.socialIconsContainer}>
            <View style={style.socialIconsWithText}>
              <Pressable
                style={style.socialIcons}
                onPress={() => Linking.openURL(`https://wa.me/${user.phoneNumber}`)}>
                <Ionicons name="logo-whatsapp" size={16} color={theme.colors.black} />
              </Pressable>
              <Text style={style.socialIconsName}>{tr("Whatsapp")}</Text>
            </View>
            <View style={style.socialIconsWithText}>
              <Pressable
                style={style.socialIcons}
                onPress={() => Linking.openURL(`sms:${user.phoneNumber}`)}>
                <AntDesign name="message1" size={16} color={SECONDARY_COLOR} />
              </Pressable>
              <Text style={style.socialIconsName}>{tr("Message")}</Text>
            </View>
            <View style={style.socialIconsWithText}>
              <Pressable
                style={style.socialIcons}
                onPress={() => Linking.openURL(`tel:${user.phoneNumber}`)}>
                <Feather name="phone-call" size={16} color={SECONDARY_COLOR} />
              </Pressable>
              <Text style={style.socialIconsName}>{tr("Call")}</Text>
            </View>
          </View>
          <WhiteSpace size={16} />
        </View>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarNameBox: { flexDirection: "row", gap: 12 },
  nameBox: { marginVertical: "auto", gap: 3 },
  iconBox: theme => ({
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.grey0}`,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
  }),
  closer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  socialContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  contactText: {
    paddingBottom: 16,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  socialIconsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialIconsWithText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcons: {
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: "#f3f3f3",
  },
  socialIconsName: {
    paddingTop: 8,
  },
});

export default ContactCard;
