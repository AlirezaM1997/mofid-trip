import React from "react";
import { router } from "expo-router";
import { Divider, useTheme } from "@rneui/themed";
import { Text } from "@rneui/themed";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { ProjectQueryType } from "@src/gql/generated";
import { EvilIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { View, ImageBackground, StyleSheet, Pressable, Platform, ViewStyle } from "react-native";
import { WIDTH } from "@src/constants";

type PropsType = {
  avatarS3: ProjectQueryType["accommodation"]["avatarS3"];
  address: ProjectQueryType["accommodation"]["address"];
  price: ProjectQueryType["price"];
  name: ProjectQueryType["name"];
  id: ProjectQueryType["id"];
  containerStyle?: ViewStyle;
};

function HostSliderCard({ price, id, name, avatarS3, address, containerStyle }: PropsType) {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { formatPrice } = useFormatPrice();

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
    <Pressable style={[style.container, containerStyle]} onPress={handlePress}>
      <ImageBackground
        style={style.ImageBackground(isRtl)}
        imageStyle={style.ImageBackgroundImage}
        source={avatar}
      />
      <View style={style.top}>
        <View style={style.top2}>
          <Text bold numberOfLines={1}>
            {name}
          </Text>
          <View style={style.rate}>
            <FontAwesome name="star" size={20} color={theme.colors.warning} />
            <Text body2>{localizeNumber(4.9)}</Text>
          </View>
        </View>
        <View style={style.address}>
          <EvilIcons name="location" size={18} color={theme.colors.black} />
          <Text caption numberOfLines={1} type="grey3">
            {address}
          </Text>
        </View>
      </View>

      <Divider />

      <View style={style.bottom}>
        {price <= 0 ? (
          <Text body2 bold>
            {tr("it is free")}
          </Text>
        ) : (
          <>
            <View style={style.bottomStyle}>
              <Text body2 bold>
                {localizeNumber(formatPrice(price))}
              </Text>
              <Text body2 bold>
                / {tr("night")}
              </Text>
            </View>
          </>
        )}
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={18}
          color={theme.colors.primary}
        />
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: WIDTH - 80,
    maxWidth: 350,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 16,
    marginVertical: 5,
    ...Platform.select({
      web: { boxShadow: "0 0 5px #12121233" },
    }),
  },
  ImageBackground: isRtl => ({
    marginRight: isRtl ? 0 : 5,
    width: "100%",
    height: (WIDTH - 80) * 0.6116,
    maxHeight: 350 * 0.6116,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 16,
    marginBottom: 10,
  }),
  ImageBackgroundImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  top: {
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rate: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    flexDirection: "row",
    gap: 2,
    marginVertical: 12,
    alignItems: "center",
  },
  top2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});

export default HostSliderCard;
