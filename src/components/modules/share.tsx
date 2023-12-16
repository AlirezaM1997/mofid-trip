import { Alert, Linking, Platform, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { BottomSheet, Button, Text, useTheme } from "@rneui/themed";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useURL } from "expo-linking";
import * as Clipboard from "expo-clipboard";
import useTranslation from "@src/hooks/translation";
import { WIDTH } from "@src/constants";

const Share = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const url = useURL();

  const tour = url?.split("/")[3] === "tour";

  const handlePressTelegram = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`https://t.me/share/url?url=${url}`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressTwitter = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`https://www.twitter.com/intent/tweet?url=${url}`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressWhatsapp = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`https://wa.me/?text=${url}`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressEmail = () => {
    if (Platform.OS === "web") {
      Linking.openURL(
        `mailto:?subject= I want to share this with you &body= Hi there, Check out this site ${url}.`
      );
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressCopy = () => {
    Clipboard.setStringAsync(url);
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  return (
    <>
      <Feather style={style.iconStyle} name="share-2" size={20} onPress={handleOpen} />

      <BottomSheet onBackdropPress={handleClose} isVisible={isVisible}>
        <Container>
          <View style={style.bottomSheetHeader}>
            <WhiteSpace />
            <Text heading2>
              {tr(
                tour
                  ? "are you sure about the tour subscription?"
                  : "are you sure about shared hosting?"
              )}
            </Text>
            <Text body2 type="grey3" center>
              {tr(
                tour
                  ? "you can republish the details of this tour to your friends so that they also know about the existence of this tour"
                  : "you can republish the details of this hosting to your friends so that they also know about the existence of this hosting"
              )}
            </Text>
          </View>
          <WhiteSpace size={16} />
          <ButtonRow>
            <View style={style.bottunShare}>
              <Button
                onPress={handlePressTelegram}
                type="clear"
                icon={<FontAwesome5 name="telegram-plane" size={24} color={theme.colors.grey5} />}
              />
              <Text caption>{tr("telegram")}</Text>
            </View>
            <View style={style.bottunShare}>
              <Button
                onPress={handlePressTwitter}
                type="clear"
                icon={<Feather name="twitter" size={24} color={theme.colors.grey5} />}
              />
              <Text caption>{tr("twitter")}</Text>
            </View>
            <View style={style.bottunShare}>
              <Button
                onPress={handlePressWhatsapp}
                type="clear"
                icon={<FontAwesome name="whatsapp" size={24} color={theme.colors.grey5} />}
              />
              <Text caption>{tr("whatsapp")}</Text>
            </View>
            <View style={style.bottunShare}>
              <Button
                onPress={handlePressEmail}
                type="clear"
                icon={<MaterialIcons name="alternate-email" size={24} color={theme.colors.grey5} />}
              />
              <Text caption>{tr("email")}</Text>
            </View>
          </ButtonRow>
          <WhiteSpace size={24} />
          <View style={style.copyBox}>
            <Text body2 type="grey3">
              {tr("or share the link")}
            </Text>
            <Pressable onPress={handlePressCopy} style={style.copyButton(theme)}>
              <FontAwesome name="copy" size={16} color={theme.colors.error} />
              <Text numberOfLines={1} type="grey3" caption>
                {url}
              </Text>
            </Pressable>
          </View>
        </Container>
      </BottomSheet>
    </>
  );
};

const style = StyleSheet.create({
  iconStyle: {
    paddingLeft: 12,
  },
  bottomSheetHeader: {
    alignItems: "center",
    gap: 8,
  },
  bottunShare: {
    alignItems: "center",
    gap: 8,
  },
  copyBox: {
    alignItems: "center",
    gap: 5,
  },
  copyButton: theme => ({
    maxWidth: WIDTH - 50,
    borderRadius: 8,
    backgroundColor: theme.colors.grey0,
    paddingVertical: 9,
    paddingHorizontal: 16,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  }),
});

export default Share;
