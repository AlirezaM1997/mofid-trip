import React from "react";
import ButtonRow from "./button-rows";
import { useURL } from "expo-linking";
import { WIDTH } from "@src/constants";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Text, useTheme } from "@rneui/themed";
import { Alert, Linking, Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";

const ShareBottomsheet = ({
  isVisible,
  handleClose,
}: {
  isVisible: boolean;
  handleClose: () => void;
}) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  const url = Platform.OS === "web" ? window.location.href : useURL();

  const tour = url?.split("/")[3] === "tour";

  const handlePressTelegram = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`https://t.me/share/url?text=از لینک زیر در مفیدتریپ دیدن کنید &url=${url}`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressTwitter = () => {
    if (Platform.OS === "web") {
      Linking.openURL(
        `https://www.twitter.com/intent/tweet?url= از لینک زیر در مفیدتریپ دیدن کنید ${url}`
      );
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressWhatsapp = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`https://wa.me/?text= از لینک زیر در مفیدتریپ دیدن کنید ${url}`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressEmail = () => {
    if (Platform.OS === "web") {
      Linking.openURL(`mailto:?subject= مفیدتریپ &body= از لینک زیر در مفیدتریپ دیدن کنید ${url}.`);
    } else {
      Alert.alert("coming soon");
    }
  };

  const handlePressCopy = async () => {
    await Clipboard.setStringAsync(url as string);
    Toast.show({
      type: "success",
      text1: tr("copied"),
    });
  };

  return (
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
  );
};

const style = StyleSheet.create({
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
  copyButton: ((theme: { colors: { grey0: string } }) => ({
    maxWidth: WIDTH - 50,
    borderRadius: 8,
    backgroundColor: theme.colors.grey0,
    paddingVertical: 9,
    paddingHorizontal: 16,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    gap: 10,
  })) as ViewStyle,
});

export default ShareBottomsheet;
