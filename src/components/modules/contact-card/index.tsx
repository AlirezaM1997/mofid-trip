import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Text, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";

const ContactCard = ({ user }) => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  return (
    <View style={style.container}>
      <View style={style.avatarNameBox}>
        <Avatar rounded size={48} source={{ uri: user.avatarS3.small }} />
        <View style={style.nameBox}>
          <Text caption type="grey3">
            {tr("tour ngo")}
          </Text>
          <Text subtitle2>{user.fullname}</Text>
        </View>
      </View>
      <View style={style.iconBox(theme)}>
        <Ionicons name="chatbubble-ellipses" size={14.4} color={theme.colors.info} />
      </View>
    </View>
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
});

export default ContactCard;
