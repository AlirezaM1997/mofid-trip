import React, { useState } from "react";
import { SECONDARY_COLOR } from "@src/theme";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import Text from "@src/components/atoms/text";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { getFullName } from "@src/helper/extra";
import TruncatedText from "@src/components/atoms/text/truncatedText";
import { useIsAuthenticated } from "@src/hooks/user";
import { BottomSheet, useTheme } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import WhiteSpace from "@src/components/atoms/white-space";
import { router } from "expo-router";

const ContactCard = ({ user }) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  const handleBottomSheet = () => {
    if (isAuthenticated) {
      setIsVisible(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.leftSide}
          onPress={() =>
            user?.ngo?.id
              ? router.push({ pathname: "/host-owner", params: { ngoId: user?.ngo?.id } })
              : null
          }>
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
            source={{
              uri: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
            }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.contactName}>{tr("Hosted By")}</Text>
            <TruncatedText
              variant="subtitle1"
              style={styles.contactName}
              width={120}
              title={getFullName(user) ?? tr("No Name")}
            />
          </View>
        </Pressable>
        <Pressable style={styles.btnContainer} onPress={handleBottomSheet}>
          <View style={styles.btn}>
            <AntDesign name="message1" size={24} color={SECONDARY_COLOR} />
          </View>
          <View style={styles.btn}>
            <Feather name="phone-call" size={24} color={SECONDARY_COLOR} />
          </View>
        </Pressable>
      </View>

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <Pressable style={styles.closer} onPress={() => setIsVisible(false)}>
          <Feather name="x-circle" size={24} color="transparent" />
          <Text variant="heading1">{tr("Contact the place")}</Text>
          <Feather name="x-circle" size={24} color="black" />
        </Pressable>
        <View style={styles.socialContainer}>
          <Text variant="body2" color={theme.colors.grey3} style={styles.contactText}>
            {tr(
              "You can contact the owner of the place through the following social networks or directly"
            )}
          </Text>
          <View style={styles.socialIconsContainer}>
            <View style={styles.socialIconsWithText}>
              <Pressable
                style={styles.socialIcons}
                onPress={() => Linking.openURL(`https://wa.me/${user.phoneNumber}`)}>
                <Ionicons name="logo-whatsapp" size={16} color="black" />
              </Pressable>
              <Text style={styles.socialIconsName}>{tr("Whatsapp")}</Text>
            </View>
            <View style={styles.socialIconsWithText}>
              <Pressable
                style={styles.socialIcons}
                onPress={() => Linking.openURL(`sms:${user.phoneNumber}`)}>
                <AntDesign name="message1" size={16} color={SECONDARY_COLOR} />
              </Pressable>
              <Text style={styles.socialIconsName}>{tr("Message")}</Text>
            </View>
            <View style={styles.socialIconsWithText}>
              <Pressable
                style={styles.socialIcons}
                onPress={() => Linking.openURL(`tel:${user.phoneNumber}`)}>
                <Feather name="phone-call" size={16} color={SECONDARY_COLOR} />
              </Pressable>
              <Text style={styles.socialIconsName}>{tr("Call")}</Text>
            </View>
          </View>
          <WhiteSpace size={16} />
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 10,
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 100,
    width: 65,
    height: 65,
    backgroundColor: "#fff",
  },
  imageBackground: { marginRight: 10, width: 65, height: 65 },
  contactName: {
    color: "#fff",
  },
  nameContainer: {
    display: "flex",
  },
  btn: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 6,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
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
