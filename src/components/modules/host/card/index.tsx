import React from "react";
import { Text } from "@rneui/themed";
import { router } from "expo-router";
import { useTheme } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import { ProjectQueryType } from "@src/gql/generated";
import { EvilIcons, Feather } from "@expo/vector-icons";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

type PropsType = {
  avatarS3: ProjectQueryType["accommodation"]["avatarS3"];
  address: ProjectQueryType["accommodation"]["address"];
  price: ProjectQueryType["price"];
  name: ProjectQueryType["name"];
  id: ProjectQueryType["id"];
};

function HostCard({ price, id, name, avatarS3, address }: PropsType) {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();

  const handlePress = () => {
    router.push({
      pathname: `/host/${id}/`,
      params: {
        id: id,
        name: name,
      },
    });
  };

  const avatar =
    avatarS3?.length > 0 ? { uri: avatarS3?.[0].small } : require("@assets/image/defaultHost.svg");

  return (
    <Pressable onPress={handlePress} style={style.container}>
      <ImageBackground style={style.ImageBackground} source={avatar} />

      <View style={style.contentContainer}>
        <Text body2 bold numberOfLines={1}>
          {name}
        </Text>

        <WhiteSpace size={6} />

        <View style={style.address}>
          <EvilIcons name="location" size={18} color={theme.colors.black} />
          <Text caption numberOfLines={1} type="grey3">
            {address}
          </Text>
        </View>

        <WhiteSpace size={6} />

        {(price as number) <= 0 ? (
          <Text body2 bold>
            {tr("it is free")}
          </Text>
        ) : (
          <>
            <Text body2 bold>
              {localizeNumber(formatPrice(price as number) as string)}
              <Text body2> / {tr("night")}</Text>
            </Text>
          </>
        )}
      </View>

      <Feather name={isRtl ? "chevron-left" : "chevron-right"} size={18} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  contentContainer: { width: "65%" },
  ImageBackground: {
    width: 64,
    height: 64,
    borderRadius: 6,
    overflow: "hidden",
  },

  address: {
    gap: 2,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default HostCard;
